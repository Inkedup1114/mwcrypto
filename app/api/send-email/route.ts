import { Resend } from 'resend';
import { getBookingConfirmationEmail, getSessionScheduledEmail } from '@/app/lib/email-templates';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { type, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let emailContent;
    if (type === 'booking_confirmation') {
      emailContent = getBookingConfirmationEmail({
        userName: user.email?.split('@')[0] || 'Valued Customer',
        bookingDetails: data.bookingDetails,
        scheduleLink: data.scheduleLink,
      });
    } else if (type === 'session_scheduled') {
      emailContent = getSessionScheduledEmail({
        userName: user.email?.split('@')[0] || 'Valued Customer',
        sessionDetails: data.sessionDetails,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    const { data: emailResponse, error } = await resend.emails.send({
      from: 'Your Company <notifications@yourdomain.com>',
      to: user.email!,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    if (error) {
      console.error('Failed to send email:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Email sent successfully',
      data: emailResponse 
    });

  } catch (error) {
    console.error('Error in send-email route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}