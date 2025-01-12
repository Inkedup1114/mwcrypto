'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-yellow-300' : 'text-yellow-500'
  }

  const navClass = "bg-black/50 backdrop-blur-sm border-t border-b border-yellow-500/20 relative z-50"
  const linkClass = "transition-colors duration-200 tracking-widest"

  return (
    <nav className={navClass}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <div className="flex space-x-12">
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
        </div>
      </div>
    </nav>
  )
}