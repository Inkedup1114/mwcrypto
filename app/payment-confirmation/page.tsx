'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/app/lib/supabase/client'
import Link from 'next/link'

interface PaymentDetails {
  amount: number
  currency: string
  status: string
  created_at: string
  booking: {
    id: string
    notes: string
    sessions: {
      id: string
      status: string
    }[]
  }
}

export default function PaymentConfirmation() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const paymentId = searchParams.get('payment')
    if (!paymentId) {
      setError('Payment ID not found')
      setLoading(false)
      return
    }

    async function fetchPaymentDetails() {
      try {
        const { data, error } = await supabase
          .from('payments')
          .select(`
            amount,
            currency,
            status,
            created_at,
            bookings (
              id,
              notes,
              sessions (
                id,
                status
              )
            )
          `)
          .eq('id', paymentId)
          .single()

        if (error) throw error

        if (data) {
          setPaymentDetails({
            ...data,
            booking: data.bookings[0] // Assuming one booking per payment
          })
        }
      } catch (err) {
        setError('Failed to load payment details')
        console.error('Error fetching payment details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentDetails()
  }, [searchParams])

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      if (paymentDetails && !error && !emailSent) {
        try {
          const baseUrl = window.location.origin
          const scheduleLink = `${baseUrl}/schedule?booking=${paymentDetails.booking.id}`
          
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'booking_confirmation',
              data: {
                bookingDetails: {
                  amount: paymentDetails.amount,
                  currency: paymentDetails.currency,
                  packageName: paymentDetails.booking.notes,
                  sessionCount: paymentDetails.booking.sessions.length,
                },
                scheduleLink,
              },
            }),
          })

          if (!response.ok) {
            console.error('Failed to send confirmation email')
          } else {
            setEmailSent(true)
          }
        } catch (err) {
          console.error('Error sending confirmation email:', err)
        }
      }
    }

    sendConfirmationEmail()
  }, [paymentDetails, error, emailSent])

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
          <Link 
            href="/"
            className="block w-full text-center bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-gray-500 mb-4">
            <h2 className="text-2xl font-bold text-center mb-2">Payment Not Found</h2>
            <p className="text-center text-gray-600">We couldn't find the payment details you're looking for.</p>
          </div>
          <Link 
            href="/"
            className="block w-full text-center bg-yellow-400 text-gray-900 py-2 px-4 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        <div className="mb-8">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h2 className="font-semibold text-gray-900 mb-2">Payment Details</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Amount: {(paymentDetails.amount / 100).toLocaleString('en-US', { style: 'currency', currency: paymentDetails.currency.toUpperCase() })}</p>
              <p>Package: {paymentDetails.booking.notes}</p>
              <p>Sessions: {paymentDetails.booking.sessions.length}</p>
              <p>Date: {new Date(paymentDetails.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href={`/schedule?booking=${paymentDetails.booking.id}`}
            className="block w-full text-center bg-yellow-400 text-gray-900 py-3 px-4 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
          >
            Schedule Your Sessions
          </Link>
          <Link
            href="/"
            className="block w-full text-center bg-gray-100 text-gray-600 py-3 px-4 rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}