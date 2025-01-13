'use client'

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../lib/supabase/types';
import { useAuth } from '../contexts/AuthContext';
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
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [error, setError] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [scheduledSessions, setScheduledSessions] = useState<Array<{date: string, time: string}>>([]);
  const supabase = createClientComponentClient<Database>();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { user } = useAuth();

  // Fetch scheduled sessions for this booking
  useEffect(() => {
    async function fetchScheduledSessions() {
      try {
        const { data: sessions, error: sessionsError } = await supabase
          .from('sessions')
          .select('date, start_time')
          .eq('booking_id', bookingId)
          .eq('status', 'scheduled');

        if (sessionsError) throw sessionsError;

        if (sessions) {
          setScheduledSessions(sessions.map(session => ({
            date: new Date(session.date).toLocaleDateString(),
            time: new Date(`1970-01-01T${session.start_time}Z`)
              .toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC'
              })
          })));
        }
      } catch (error) {
        console.error('Error fetching scheduled sessions:', error);
      }
    }

    fetchScheduledSessions();
  }, [bookingId, supabase]);

  useEffect(() => {
    const fetchAvailableTimes = async (date: Date) => {
      try {
        setLoadingTimes(true);
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
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 w-full max-w-[90%] md:max-w-md mx-auto">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
        Schedule Your Session
      </h3>

      <div className="mb-4 text-sm text-gray-600">
        Your timezone: <span className="font-medium">{timezone}</span>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {scheduledSessions.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Your Scheduled Sessions</h4>
          <ul className="space-y-2">
            {scheduledSessions.map(({date, time}, index) => (
              <li key={index} className="text-sm text-blue-800">
                {date} at {time}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateSelect}
            minDate={new Date()}
            className="w-full px-4 py-3 border rounded-lg bg-white text-gray-900 text-base focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            disabled={loading}
            dateFormat="MMMM d, yyyy"
            placeholderText="Tap to select a date"
            calendarClassName="!text-base" // Make calendar text larger for mobile
          />
        </div>
      </div>

      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          {loadingTimes ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableTimes.map((time: string) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  disabled={loading}
                  className={`p-3 md:p-2 text-base md:text-sm rounded-lg transition-colors ${
                    selectedTime === time
                      ? 'bg-yellow-400 text-gray-900 font-medium'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {time}
                </button>
              ))}
              {availableTimes.length === 0 && (
                <div className="col-span-2 sm:col-span-3 p-6 text-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">
                    No available times for this date
                  </p>
                  <p className="text-gray-400 text-xs">
                    Try selecting a different date
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}