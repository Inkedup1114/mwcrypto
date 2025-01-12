import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { supabase, createPayment, createBookingWithSessions } from '@/app/lib/supabase/client';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const resend = new Resend(process.env.RESEND_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const { metadata } = paymentIntent;

      // Create payment record
      const payment = await createPayment({
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: 'completed',
        stripe_payment_intent_id: paymentIntent.id,
        stripe_payment_status: paymentIntent.status,
        user_id: metadata.userId
      });

      if (!payment) throw new Error('Failed to create payment record');

      // Create booking with initial session placeholders
      const sessionsCount = parseInt(metadata.sessionsIncluded);
      
      const booking = {
        user_id: metadata.userId,
        payment_id: payment.id,
        status: 'confirmed' as const,
        notes: metadata.planTitle
      };

      // Let createBookingWithSessions handle adding booking_id to sessions
      const bookingResult = await createBookingWithSessions(
        booking,
        Array(sessionsCount).fill({
          date: new Date().toISOString(),
          start_time: '00:00:00',
          end_time: '00:00:00',
          status: 'scheduled' as const,
          notes: 'Pending scheduling'
        })
      );

      if (!bookingResult) throw new Error('Failed to create booking');

      // Get user email for notification
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('id', metadata.userId)
        .single();

      if (userError) throw userError;

      // Send confirmation email
      await resend.emails.send({
        from: 'Crypto Education <noreply@yourdomain.com>',
        to: userData.email,
        subject: 'Payment Confirmed - Schedule Your Sessions',
        html: `
          <h1>Thank you for your payment!</h1>
          <p>Dear ${userData.full_name},</p>
          <p>Your payment for ${metadata.planTitle} has been confirmed.</p>
          <p>Package Details:</p>
          <ul>
            <li>Number of Sessions: ${metadata.sessionsIncluded}</li>
            <li>Session Duration: ${metadata.sessionDuration} minutes</li>
          </ul>
          <p>Please visit our website to schedule your sessions.</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/schedule?booking=${bookingResult.booking.id}" style="background-color: #EAB308; color: #1f2937; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            Schedule Now
          </a>
        `
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';