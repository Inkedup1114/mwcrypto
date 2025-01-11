'use client'

import Link from 'next/link'

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            There was a problem with the authentication process.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-sm text-center">
            <p className="mb-4">
              This could happen for several reasons:
            </p>
            <ul className="list-disc text-left space-y-2 mb-6">
              <li>The authentication link has expired</li>
              <li>The link has already been used</li>
              <li>There was a problem with the authentication service</li>
            </ul>
            <p className="mb-4">
              Please try to sign in again or contact support if the problem persists.
            </p>
          </div>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}