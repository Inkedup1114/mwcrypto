import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

interface PlanDetails {
  price: number;
  title: string;
  sessions: number;
  sessionDuration: number;
}

const PLAN_PRICES: Record<string, PlanDetails> = {
  'two-sessions': {
    price: 20000, // $200.00
    title: 'Crypto Education 2-Session Package',
    sessions: 2,
    sessionDuration: 45
  },
  // Add more plans as needed
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, customTitle, startDate } = body;

    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const planDetails = PLAN_PRICES[plan];

    const paymentIntent = await stripe.paymentIntents.create({
      amount: planDetails.price,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: plan,
        planTitle: customTitle || planDetails.title,
        sessionsIncluded: planDetails.sessions.toString(),
        sessionDuration: `${planDetails.sessionDuration} minutes`,
        startDate: startDate || '',
        createdAt: new Date().toISOString(),
        status: 'pending'
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      planDetails
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 400 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your payment' },
      { status: 500 }
    );
  }
}