import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const SESSION_PRICE = 10000; // $100.00

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: SESSION_PRICE,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planTitle: 'Crypto Education Session',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}