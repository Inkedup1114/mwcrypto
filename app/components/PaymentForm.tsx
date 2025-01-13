'use client'

import { useState } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  clientSecret: string;
  onSuccess?: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ onSuccess, onError }: Omit<PaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required'
      })

      if (error) {
        onError(error.message || 'Payment failed')
      } else if (paymentIntent.status === 'succeeded') {
        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(paymentIntent.id)
        }
        
        // Redirect to payment confirmation page
        router.push(`/payment-confirmation?payment=${paymentIntent.id}`)
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6 px-2 md:px-0">
        <PaymentElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full bg-yellow-400 text-gray-900 py-3 md:py-2 px-4 rounded-full font-semibold text-sm md:text-base hover:bg-yellow-500 transition-colors ${
          (!stripe || processing) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  )
}

export default function PaymentForm({ clientSecret, onSuccess, onError }: PaymentFormProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#EAB308',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
      },
      rules: {
        '.Input': {
          padding: '12px',
          fontSize: '16px', // Better for mobile to prevent zoom
        },
      },
    },
  }

  return (
    <div className="w-full max-w-[90%] md:max-w-md mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-lg">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm onSuccess={onSuccess} onError={onError} />
      </Elements>
    </div>
  )
}