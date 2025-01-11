# Next.js Learning Platform

A modern learning platform built with:
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Database & Authentication)

## Features
- Responsive design
- User authentication
- Payment integration
- Course management
- Interactive learning interface

## Prerequisites

Before you begin, ensure you have:
- Node.js 16.8 or later
- A Supabase account (free tier available at https://supabase.com)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Inkedup1114/mwcrypto.git
cd mwcrypto
```

2. Install dependencies
```bash
npm install
```

3. Set up Supabase
   1. Create a new project on [Supabase](https://supabase.com)
   2. Go to Project Settings -> API to find your project URL and anon key
   3. Create a `.env.local` file in the root directory with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Set up the database
   1. Go to the SQL editor in your Supabase dashboard
   2. Copy the contents of `app/lib/supabase/schema.sql`
   3. Paste and run the SQL commands to create the necessary tables and policies

5. Configure Authentication
   1. In your Supabase dashboard, go to Authentication -> Settings
   2. Enable Email provider
   3. Configure Site URL: `http://localhost:3000` (for development)
   4. Add redirect URLs:
      - `http://localhost:3000/auth/callback` (for development)
      - `https://your-production-domain.com/auth/callback` (for production)

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `app/` - Next.js 13 app directory
  - `components/` - Reusable UI components
  - `contexts/` - React context providers
  - `lib/` - Utility functions and configurations
    - `supabase/` - Supabase client and types
  - `auth/` - Authentication related routes
  - `learn/` - Learning platform pages
  - `contact/` - Contact page
- `public/` - Static assets

## Database Schema

### Users Table
- `id` - UUID (references auth.users)
- `email` - User's email address
- `full_name` - User's full name (optional)
- `avatar_url` - Profile picture URL (optional)
- `created_at` - Timestamp of account creation
- `updated_at` - Timestamp of last update

### Payments Table
- `id` - UUID
- `user_id` - References users.id
- `amount` - Payment amount
- `currency` - Payment currency
- `status` - Payment status (pending/completed/failed)
- `payment_method` - Payment method used
- `description` - Payment description
- `created_at` - Timestamp of payment

### Subscriptions Table
- `id` - UUID
- `user_id` - References users.id
- `plan_id` - Subscription plan identifier
- `status` - Subscription status (active/cancelled/expired)
- `current_period_start` - Start of current billing period
- `current_period_end` - End of current billing period
- `cancelled_at` - Timestamp of cancellation (if applicable)

## Authentication Flow

The application uses Supabase Authentication with the following flow:
1. User signs up/logs in via email/password
2. Email confirmation sent for new sign-ups
3. User confirms email through Supabase-hosted page
4. Redirect to application with session
5. Protected routes require authentication
6. Auth state managed through AuthContext

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
