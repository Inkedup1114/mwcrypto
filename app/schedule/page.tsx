'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import BookingCalendar from '../components/BookingCalendar'
import type { Database } from '../lib/supabase/types'

interface BookingDetails {
  id: string
  notes: string
  sessions: {
    id: string
    status: string
  }[]
}

export default function SchedulePage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const bookingId = searchParams.get('booking')
    if (!bookingId) {
      setError('Booking ID not found')
      setLoading(false)
      return
    }

    async function fetchBookingDetails() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          setError('Please sign in to schedule your sessions')
          return
        }

        const { data, error: bookingError } = await supabase
          .from('bookings')
          .select(`
            id,
            notes,
            sessions (
              id,
              status
            )
          `)
          .eq('id', bookingId)
          .eq('user_id', user.id)
          .single()

        if (bookingError) throw bookingError

        if (data) {
          setBooking(data)
        } else {
          setError('Booking not found')
        }
      } catch (err) {
        setError('Failed to load booking details')
        console.error('Error fetching booking details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [searchParams, supabase])

  const handleSessionScheduled = async (sessionDetails: {
    date: string
    time: string
    timezone: string
  }) => {
    try {
      // Send email notification for scheduled session
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'session_scheduled',
          data: {
            sessionDetails,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send session confirmation email')
      }
    } catch (error) {
      console.error('Error sending session confirmation email:', error)
      // Continue even if email fails
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-center mb-2">Error</h2>
            <p className="text-center text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-gray-500 mb-4">
            <h2 className="text-2xl font-bold text-center mb-2">Booking Not Found</h2>
            <p className="text-center text-gray-600">We couldn't find the booking details you're looking for.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Schedule Your Sessions
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Booking Details
            </h2>
            <p className="text-gray-600">
              Package: {booking.notes}
            </p>
            <p className="text-gray-600">
              Sessions Remaining: {booking.sessions.filter(s => s.status === 'pending').length}
            </p>
          </div>
          
          <BookingCalendar
            bookingId={booking.id}
            onSessionScheduled={handleSessionScheduled}
          />
        </div>
      </div>
    </div>
  )
}