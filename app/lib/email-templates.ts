export const getBookingConfirmationEmail = ({
  userName,
  bookingDetails,
  scheduleLink,
}: {
  userName: string;
  bookingDetails: {
    amount: number;
    currency: string;
    packageName: string;
    sessionCount: number;
  };
  scheduleLink: string;
}) => ({
  subject: 'Booking Confirmation - Thank You!',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(to right, #f97316, #facc15);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 8px 8px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(to right, #f97316, #facc15);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
          }
          .details {
            background: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Confirmed!</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          
          <p>Thank you for your booking! Your payment has been successfully processed.</p>
          
          <div class="details">
            <h3>Booking Details:</h3>
            <p>Package: ${bookingDetails.packageName}</p>
            <p>Amount: ${(bookingDetails.amount / 100).toLocaleString('en-US', {
              style: 'currency',
              currency: bookingDetails.currency.toUpperCase(),
            })}</p>
            <p>Number of Sessions: ${bookingDetails.sessionCount}</p>
          </div>
          
          <p><strong>Next Step: Schedule Your Sessions</strong></p>
          <p>Please click the button below to schedule your sessions at times that work best for you:</p>
          
          <a href="${scheduleLink}" class="button">Schedule Your Sessions</a>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>Your Team</p>
        </div>
      </body>
    </html>
  `,
});

export const getSessionScheduledEmail = ({
  userName,
  sessionDetails,
}: {
  userName: string;
  sessionDetails: {
    date: string;
    time: string;
    timezone: string;
  };
}) => ({
  subject: 'Session Scheduled - Confirmation',
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Session Scheduled</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(to right, #f97316, #facc15);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 0 0 8px 8px;
          }
          .details {
            background: #f9fafb;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Session Scheduled!</h1>
        </div>
        <div class="content">
          <p>Dear ${userName},</p>
          
          <p>Your session has been successfully scheduled!</p>
          
          <div class="details">
            <h3>Session Details:</h3>
            <p>Date: ${sessionDetails.date}</p>
            <p>Time: ${sessionDetails.time}</p>
            <p>Timezone: ${sessionDetails.timezone}</p>
          </div>
          
          <p><strong>Important Notes:</strong></p>
          <ul>
            <li>Please join the session 5 minutes before the scheduled time</li>
            <li>Ensure you have a stable internet connection</li>
            <li>Have any relevant materials ready</li>
          </ul>
          
          <p>If you need to reschedule or have any questions, please contact our support team.</p>
          
          <p>Best regards,<br>Your Team</p>
        </div>
      </body>
    </html>
  `,
});