'use client'

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../lib/supabase/types';
import PaymentForm from './PaymentForm';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

interface BookingCalendarProps {
  selectedPlan: string;
}

export default function BookingCalendar({ selectedPlan }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const supabase = createClientComponentClient<Database>();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
    setShowPayment(false);
    setClientSecret('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowPayment(false);
    setClientSecret('');
  };

  const handleProceedToPayment = async () => {
    if (!selectedDate || !selectedTime) return;

    try {
      setLoading(true);
      setError('');

      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('Please sign in to book a consultation');
        return;
      }

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      setShowPayment(true);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Create booking in Supabase
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            date: selectedDate!.toISOString(),
            time: selectedTime,
            plan_title: selectedPlan,
            status: 'confirmed',
          }
        ]);

      if (bookingError) throw bookingError;

      // Reset form
      setSelectedDate(null);
      setSelectedTime('');
      setShowPayment(false);
      setClientSecret('');

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create booking');
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
    setShowPayment(false);
    setClientSecret('');
  };

  if (showPayment && clientSecret) {
    return (
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-white">Complete Payment</h3>
        <p className="text-gray-300 mb-4">
          You're booking 2 sessions (45 minutes each) for $100. The second session will be scheduled after your first session.
        </p>
        <PaymentForm
          clientSecret={clientSecret}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-white">Schedule Your First Session</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-white mb-2">
          Select Date
        </label>
        <input
          type="date"
          className="w-full px-3 py-2 border rounded-md bg-white/20 text-white"
          onChange={(e) => handleDateSelect(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
          disabled={loading}
        />
      </div>

      {selectedDate && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                disabled={loading}
                className={`p-2 text-sm rounded-md ${
                  selectedTime === time
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <button
          onClick={handleProceedToPayment}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-md font-semibold hover:from-orange-600 hover:to-yellow-600 transition-colors ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Processing...' : 'Proceed to Payment'}
        </button>
      )}
    </div>
  );
}