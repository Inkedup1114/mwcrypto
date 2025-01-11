'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// TODO: Implement mobile responsive menu with hamburger icon
// FIXME: Active link highlighting doesn't work properly on dynamic routes
// NOTE: Navigation structure follows atomic design principles
export default function Navigation() {
  const pathname = usePathname()

  // HACK: Using inline styles for transitions - should be moved to Tailwind config
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-500' : 'text-gray-600 hover:text-blue-500'
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-blue-500">
            MSC
          </Link>
          <div className="flex space-x-8">
            <Link href="/" className={`${isActive('/')} transition-colors duration-200`}>
              Home
            </Link>
            <Link href="/learn" className={`${isActive('/learn')} transition-colors duration-200`}>
              Learn
            </Link>
            <Link href="/contact" className={`${isActive('/contact')} transition-colors duration-200`}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}