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

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory and add:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `app/` - Next.js 13 app directory
  - `components/` - Reusable UI components
  - `learn/` - Learning platform pages
  - `contact/` - Contact page
- `public/` - Static assets

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
