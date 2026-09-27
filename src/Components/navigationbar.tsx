import React, { useState } from 'react'
import defaultLogo from '@/assets/ic-iconinternasional.svg'

export interface NavigationBarProps {
  /** Optional custom logo image source, defaults to summit logo */
  logoSrc?: string
  /** Active navigation item key or label */
  activeItem?: string
  /** Callback when Sign In is clicked */
  onSignIn?: () => void
  /** Optional custom navigation items */
  items?: Array<{
    label: string
    href: string
    hasDropdown?: boolean
    dropdownItems?: Array<{ label: string; href: string }>
  }>
  /** Positioning mode: 'fixed' | 'absolute' | 'sticky'. Defaults to 'fixed' */
  position?: 'fixed' | 'absolute' | 'sticky'
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  logoSrc = defaultLogo,
  activeItem = 'Home',
  onSignIn,
  items,
  position = 'fixed',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false)

  const defaultNavItems: NonNullable<NavigationBarProps['items']> = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'IBCC', href: '#competitions' },
    // TODO: point to the merchandise page once it exists.
    { label: 'Merchandise', href: '#merchandise' },
  ]

  const navItems = items || defaultNavItems

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 py-5 sm:px-6 lg:px-8">
      {/* Outer Pill Container */}
      <nav
        aria-label="Main Navigation"
        className="w-full max-w-[1240px] h-[70px] sm:h-[76px] rounded-full px-5 sm:px-8 flex items-center justify-between relative transition-all duration-300 font-['Poppins',sans-serif] pointer-events-auto"
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.0) 50%), linear-gradient(90deg, #4282f6 0%, #3175f6 45%, #1e5fed 100%)',
          border: '2px solid rgba(255, 255, 255, 0.85)',
          boxShadow:
            '0 12px 30px -4px rgba(29, 78, 216, 0.4), 0 0 18px 2px rgba(66, 133, 244, 0.3), inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)',
        }}
      >
        {/* Left: Logo using an <img> tag */}
        <div className="flex items-center flex-shrink-0">
          <a
            href="#home"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full"
            aria-label="Home"
          >
            <img
              src={logoSrc}
              alt="SxC International Summit"
              className="h-12 sm:h-[52px] w-auto max-w-[160px] sm:max-w-[190px] object-contain select-none drop-shadow-sm transition-transform duration-200 hover:scale-105"
              loading="eager"
            />
          </a>
        </div>

        {/* Center: Navigation Links (Text) for Desktop */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-12 m-0 p-0 list-none">
          {navItems.map((item) => {
            const isActive = activeItem.toLowerCase() === item.label.toLowerCase()

            if (item.hasDropdown) {
              return (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsProgramDropdownOpen(true)}
                  onMouseLeave={() => setIsProgramDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setIsProgramDropdownOpen(!isProgramDropdownOpen)}
                    aria-expanded={isProgramDropdownOpen}
                    className={`flex items-center gap-1.5 text-[16px] lg:text-[17px] font-semibold tracking-wide transition-all duration-200 cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-white underline underline-offset-[10px] decoration-2 decoration-white'
                        : 'text-white/95 hover:text-white hover:opacity-90'
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-200 stroke-[2.5] ${
                        isProgramDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Program Dropdown Menu */}
                  {item.dropdownItems && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 py-2 rounded-2xl transition-all duration-200 origin-top shadow-2xl backdrop-blur-md ${
                        isProgramDropdownOpen
                          ? 'opacity-100 scale-100 pointer-events-auto visible'
                          : 'opacity-0 scale-95 pointer-events-none invisible'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #1d5ce5 0%, #1545b7 100%)',
                        border: '1.5px solid rgba(255, 255, 255, 0.75)',
                        boxShadow: '0 14px 32px rgba(15, 35, 110, 0.45)',
                      }}
                    >
                      {item.dropdownItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-[14px] text-white/90 hover:text-white hover:bg-white/15 rounded-xl mx-1.5 transition-colors font-medium"
                          onClick={() => setIsProgramDropdownOpen(false)}
                        >
                          <span>{subItem.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`text-[16px] lg:text-[17px] tracking-wide transition-all duration-200 block ${
                    isActive
                      ? 'text-white font-semibold underline underline-offset-[10px] decoration-2 decoration-white'
                      : 'text-white/95 font-semibold hover:text-white hover:opacity-90'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right: Sign In Button with golden gloss gradient and blue text */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={onSignIn}
            className="group relative h-[44px] sm:h-[48px] px-8 sm:px-10 rounded-full font-semibold text-[16px] sm:text-[17px] tracking-wide text-[#1c55d2] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none flex items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #fff9e6 0%, #fcd65b 45%, #f49e0b 100%)',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              boxShadow:
                '0 4px 16px rgba(245, 158, 11, 0.45), inset 0 1px 2px rgba(255, 255, 255, 1)',
            }}
          >
            <span>Sign In</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 focus:outline-none cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6 stroke-[2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 stroke-[2]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-full left-4 right-4 mt-2 p-5 rounded-3xl md:hidden z-50 backdrop-blur-md flex flex-col gap-4 animate-in fade-in duration-200 pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, #2b6fe9 0%, #194dc4 100%)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 12px 30px rgba(10, 30, 90, 0.5)',
          }}
        >
          <ul className="flex flex-col gap-3 m-0 p-0 list-none font-['Poppins',sans-serif]">
            {navItems.map((item) => {
              const isActive = activeItem.toLowerCase() === item.label.toLowerCase()
              return (
                <li key={item.label} className="border-b border-white/10 pb-2">
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 text-[16px] ${
                      isActive
                        ? 'text-white font-semibold underline underline-offset-4 decoration-2 decoration-white'
                        : 'text-white/90 font-medium hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false)
                onSignIn?.()
              }}
              className="w-full py-2.5 rounded-full font-semibold text-[16px] text-[#1c55d2] transition-transform active:scale-95"
              style={{
                background: 'linear-gradient(180deg, #fff7dc 0%, #fbd558 46%, #f59e0b 100%)',
                border: '1.5px solid rgba(255, 255, 255, 0.95)',
                boxShadow:
                  '0 4px 14px rgba(245, 158, 11, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
              }}
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default NavigationBar
