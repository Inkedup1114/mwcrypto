'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path ? 'text-yellow-300' : 'text-yellow-500'
  }

  const navClass = "bg-black/50 backdrop-blur-sm border-t border-b border-yellow-500/20 relative z-50"
  const linkClass = "transition-colors duration-200 tracking-widest"

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <button
           onClick={() => setIsMenuOpen(!isMenuOpen)}
           className="md:hidden p-3 text-yellow-500 hover:text-yellow-400 -ml-3"
           aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex justify-center flex-1 space-x-12">
            <Link 
              href="/" 
              className={`${isActive('/')} ${linkClass} hover:text-yellow-400`}
            >
              HOME
            </Link>
            <Link 
              href="/learn" 
              className={`${isActive('/learn')} ${linkClass} hover:text-yellow-400`}
            >
              LEARN
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact')} ${linkClass} hover:text-yellow-400`}
            >
              CONTACT
            </Link>
          </div>

          {/* Mobile navigation */}
          <div className={`
            absolute top-16 left-0 right-0
            bg-black/98 backdrop-blur-md border-b border-yellow-500/20
            md:hidden
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}>
            <div className="flex flex-col items-center py-6 space-y-6">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`${isActive('/')} ${linkClass} hover:text-yellow-400 w-full text-center py-3 text-lg active:bg-yellow-500/10`}
              >
                HOME
              </Link>
              <Link
                href="/learn"
                onClick={() => setIsMenuOpen(false)}
                className={`${isActive('/learn')} ${linkClass} hover:text-yellow-400 w-full text-center py-3 text-lg active:bg-yellow-500/10`}
              >
                LEARN
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`${isActive('/contact')} ${linkClass} hover:text-yellow-400 w-full text-center py-3 text-lg active:bg-yellow-500/10`}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}