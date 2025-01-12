'use client'

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../lib/supabase/types';
import "react-datepicker/dist/react-datepicker.css";

// Helper function to convert time from local to UTC
const convertTimeToUTC = (timeStr: string, date: Date, timezone: string): string => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  
  // Create a date in the user's timezone
  const localDate = new Date(date);
  localDate.setHours(
    period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours,
    minutes
  );

  // Convert the local time to UTC using the provided timezone
  const utcDate = new Date(
    localDate.toLocaleString('en-US', {
      timeZone: timezone
    })
  );

  // Format the UTC time
  return utcDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  });
};

// Helper function to add minutes to time string
const addMinutes = (timeStr: string, minutes: number): string => {
  const [time, period] = timeStr.split(' ');
  const [hours, mins] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
  date.setMinutes(mins + minutes);
  const newHours = date.getHours();
  return `${newHours > 12 ? newHours - 12 : newHours}:${String(date.getMinutes()).padStart(2, '0')} ${newHours >= 12 ? 'PM' : 'AM'}`;
};

interface BookingCalendarProps {
  bookingId: string;
  onSessionScheduled: (sessionDetails: {
    date: string;
    time: string;
    timezone: string;
  }) => void;
}

export default function BookingCalendar({ bookingId, onSessionScheduled }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const supabase = createClientComponentClient<Database>();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchAvailableTimes = async (date: Date) => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch('/api/check-availability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: date.toISOString(),
            timezone
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch available times');
        }

        const { availableTimes } = await response.json();
        setAvailableTimes(availableTimes);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch available times');
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchAvailableTimes(selectedDate);
    }
  }, [selectedDate, timezone]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = async (time: string) => {
    try {
      setLoading(true);
      setError('');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Create session
      const { error: sessionError } = await supabase
        .from('sessions')
        .insert([
          {
            booking_id: bookingId,
            date: selectedDate!.toISOString().split('T')[0],
            start_time: convertTimeToUTC(time, selectedDate!, timezone),
            end_time: convertTimeToUTC(addMinutes(time, 45), selectedDate!, timezone),
            status: 'scheduled'
          }
        ]);

      if (sessionError) throw sessionError;

      setSelectedTime(time);
      
      // Notify parent component
      onSessionScheduled({
        date: selectedDate!.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: timezone
        }),
        time,
        timezone
      });

      // Reset form
      setSelectedDate(null);
      setSelectedTime('');
      setAvailableTimes([]);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to schedule session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Schedule Your Session
      </h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          minDate={new Date()}
          className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
          disabled={loading}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a date"
        />
      </div>

      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time: string) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={loading}
                className={`p-2 text-sm rounded-md ${
                  selectedTime === time
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {time}
              </button>
            ))}
            {availableTimes.length === 0 && !loading && (
              <p className="col-span-3 text-center text-gray-500 py-4">
                No available times for this date
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}