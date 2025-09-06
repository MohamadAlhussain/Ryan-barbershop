'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Über Uns' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Kontakt' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus:ring-0">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center interactive-hover">
              <span className="text-xl font-bold text-black">R</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold text-white link-hover">
                RYAN
              </span>
              <div className="text-xs text-gray-400 -mt-1">BARBERSHOP</div>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full font-medium link-hover focus:outline-none focus:ring-0 ${
                  pathname === item.href
                    ? 'text-amber-400'
                    : 'text-gray-300'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button - Right */}
          <div className="hidden lg:block">
            <Link
              href="/booking"
              className="btn-primary"
            >
              Termin Buchen
            </Link>
          </div>

          {/* Mobile menu button - Improved touch target */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 link-hover touch-target flex items-center justify-center"
            aria-label="Menu öffnen"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-current transform transition-all duration-200 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transform transition-all duration-200 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`block w-5 h-0.5 bg-current transform transition-all duration-200 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden fixed top-0 left-0 w-full h-screen z-[9999] bg-black/95 backdrop-blur-md">
            {/* Close Button - Improved touch target */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-14 h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center link-hover min-h-[44px] min-w-[44px]"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl md:text-2xl font-bold link-hover focus:outline-none focus:ring-0 min-h-[44px] flex items-center justify-center px-6 py-4 ${
                    pathname === item.href
                      ? 'text-amber-400'
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile CTA Button */}
              <Link
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-lg mt-4"
              >
                Termin Buchen
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
