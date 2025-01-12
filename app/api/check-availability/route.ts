import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { formatInTimeZone } from 'date-fns-tz';

// Helper function to convert time from Central Time to UTC
const centralToUtc = (dateStr: string, timeStr: string): Date => {
  // Create a date in Central Time
  const centralDate = new Date(`${dateStr}T${timeStr}`);
  
  // Get the UTC time string
  const utcTimeStr = centralDate.toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Parse the UTC time string back into a Date object
  const [hours, minutes, seconds] = utcTimeStr.split(':').map(Number);
  const utcDate = new Date(centralDate);
  utcDate.setUTCHours(hours, minutes, seconds);
  
  return utcDate;
};

export async function POST(request: Request) {
  try {
    const { date, timezone } = await request.json();

    if (!date || !timezone) {
      return NextResponse.json(
        { error: 'Date and timezone are required' },
        { status: 400 }
      );
    }

    const requestDate = new Date(date);
    const dateStr = requestDate.toISOString().split('T')[0];
    
    // Initialize Supabase client
    const supabase = createRouteHandlerClient({ cookies });

    // Get existing bookings for the date
    const { data: existingBookings, error: bookingsError } = await supabase
      .from('sessions')
      .select('start_time, end_time')
      .eq('date', dateStr)
      .neq('status', 'cancelled');

    if (bookingsError) {
      throw bookingsError;
    }

    // Generate time slots from 10 AM to 9 PM Central Time with 45-minute duration
    const slots = [];
    const startHour = 10; // 10 AM CT
    const endHour = 21;   // 9 PM CT
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 45) {
        // Skip slots that would end after 9 PM CT
        const endMinute = minute + 45;
        if (hour === endHour - 1 && endMinute > 60) continue;

        // Create time strings for Central Time
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
        const endTime = endMinute >= 60 
          ? `${(hour + 1).toString().padStart(2, '0')}:${(endMinute - 60).toString().padStart(2, '0')}:00`
          : `${hour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:00`;

        // Convert to UTC for database storage
        const startDateTime = centralToUtc(dateStr, startTime);
        const endDateTime = centralToUtc(dateStr, endTime);

        // Create the slot with both display time and UTC time
        slots.push({
          // Format the display time in user's timezone
          start: formatInTimeZone(
            new Date(`${dateStr}T${startTime}`),
            'America/Chicago',
            'h:mm aa'
          ),
          end: formatInTimeZone(
            new Date(`${dateStr}T${endTime}`),
            'America/Chicago',
            'h:mm aa'
          ),
          // Store UTC times for database comparison
          startUtc: startDateTime.toTimeString().slice(0, 8),
          endUtc: endDateTime.toTimeString().slice(0, 8)
        });
      }
    }

    // Filter out times that conflict with existing bookings
    const availableTimes = slots.filter(slot => {
      const slotStart = new Date(`1970/01/01 ${slot.startUtc}`);
      const slotEnd = new Date(`1970/01/01 ${slot.endUtc}`);

      return !existingBookings.some(booking => {
        const bookingStart = new Date(`1970/01/01 ${booking.start_time}`);
        const bookingEnd = new Date(`1970/01/01 ${booking.end_time}`);

        return (
          (slotStart >= bookingStart && slotStart < bookingEnd) ||
          (slotEnd > bookingStart && slotEnd <= bookingEnd)
        );
      });
    });

    return NextResponse.json({ availableTimes: availableTimes.map(slot => slot.start) });
  } catch (error) {
    console.error('Availability check error:', error);
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    );
  }
}