import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, User, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import defaultLogo from '@/assets/ic-icon-internasional.svg'
import { competitionMenu, eventMenu } from '@/data/programs'

export interface NavigationBarProps {
  /** Optional custom logo image source, defaults to summit logo */
  logoSrc?: string
  /** Active navigation item key or label */
  activeItem?: string
  /** Callback when Sign In is clicked */
  onSignIn?: () => void
  /** Target link for Sign In button, defaults to '/login' */
  signInHref?: string
  /** Optional custom navigation items */
  items?: Array<{
    label: string
    href: string
    hasDropdown?: boolean
    /** Small gold tag on the item, used to point out what is on going right now. */
    badge?: string
    dropdownItems?: Array<{ label: string; href: string; description?: string }>
  }>
  /** Positioning mode: 'fixed' | 'absolute' | 'sticky'. Defaults to 'fixed' */
  position?: 'fixed' | 'absolute' | 'sticky'
}

/** In-app paths use the router (hash links scroll via ScrollToTop); full URLs open in a new tab. */
function MenuLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className: string
  onClick: () => void
  children: React.ReactNode
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

/** Gold dot + title + short definition: one row of a Competition / Events dropdown. */
function MenuEntry({ label, description }: { label: string; description?: string }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#fcd65b] shadow-[0_0_8px_rgba(252,214,91,0.85)] transition-transform group-hover/item:scale-125"
      />
      <span className="min-w-0">
        <span className="block text-[14px] leading-tight font-bold text-white">{label}</span>
        {description && (
          <span className="mt-1 block text-[12px] leading-snug font-medium text-white/80">
            {description}
          </span>
        )}
      </span>
    </>
  )
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  logoSrc = defaultLogo,
  activeItem = 'Home',
  onSignIn,
  items,
  signInHref = '/login',
  position = 'fixed',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Which dropdown is open: by hover/click on desktop, and as an accordion in the mobile drawer.
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpenMenu, setMobileOpenMenu] = useState<string | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const firstName = user?.name?.split(' ')[0] ?? ''

  // The account menu closes on an outside click or Escape.
  useEffect(() => {
    if (!accountOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (!accountRef.current?.contains(e.target as Node)) setAccountOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [accountOpen])

  const handleLogout = async () => {
    setIsMobileMenuOpen(false)
    setAccountOpen(false)
    await logout()
    navigate('/')
  }

  const defaultNavItems: NonNullable<NavigationBarProps['items']> = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'IBCC', href: '/ibcc', badge: 'Ongoing' },
    {
      label: 'Competition',
      href: '/#competitions',
      hasDropdown: true,
      dropdownItems: competitionMenu,
    },
    { label: 'Events', href: '/#events', hasDropdown: true, dropdownItems: eventMenu },
    { label: 'Merchandise', href: '/merchandise' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ]

  const navItems = items || defaultNavItems

  return (
    <header
      className="inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-5 pb-3 sm:px-8 lg:px-8 xl:px-14"
      style={{ position }}
    >
      {/* Outer Pill Container */}
      <nav
        aria-label="Main Navigation"
        className="w-full max-w-[1240px] h-[64px] sm:h-[68px] rounded-full px-5 sm:px-8 lg:px-6 xl:px-8 gap-3 xl:gap-5 flex items-center justify-between relative transition-all duration-300 font-['Poppins',sans-serif] pointer-events-auto"
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
          <Link
            to="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-white/40 rounded-full"
            aria-label="Home"
          >
            <img
              src={logoSrc}
              alt="SxC International Summit"
              className="h-11 sm:h-[46px] lg:h-10 xl:h-[46px] w-auto max-w-[150px] sm:max-w-[175px] lg:max-w-[140px] xl:max-w-[175px] object-contain select-none drop-shadow-sm transition-transform duration-200 hover:scale-105"
              loading="eager"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Text) for Desktop */}
        <ul className="hidden lg:flex items-center gap-3 xl:gap-6 m-0 p-0 list-none">
          {navItems.map((item) => {
            const isActive = activeItem.toLowerCase() === item.label.toLowerCase()

            if (item.hasDropdown) {
              const isOpen = openMenu === item.label
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onMouseLeave={() => setOpenMenu(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpenMenu(null)
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 text-[14px] xl:text-[15.5px] font-semibold tracking-wide transition-all duration-200 cursor-pointer focus:outline-none ${
                      isActive
                        ? 'text-white underline underline-offset-[10px] decoration-2 decoration-white'
                        : 'text-white/95 hover:text-white hover:opacity-90'
                    }`}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 text-white transition-transform duration-200 stroke-[2.5] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* The padding on this wrapper bridges the gap, so the menu doesn't close while the pointer travels to it. */}
                  {item.dropdownItems && (
                    <div
                      className={`absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4 transition-all duration-200 origin-top ${
                        isOpen
                          ? 'opacity-100 scale-100 pointer-events-auto visible'
                          : 'opacity-0 scale-95 pointer-events-none invisible'
                      }`}
                    >
                      <div
                        className="w-[19rem] rounded-2xl p-2 backdrop-blur-md"
                        style={{
                          background: 'linear-gradient(135deg, #2b6fe9 0%, #1545b7 100%)',
                          border: '1.5px solid rgba(255, 255, 255, 0.8)',
                          boxShadow:
                            '0 16px 36px rgba(15, 35, 110, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        <p className="px-3 pt-1.5 pb-1 text-[11px] font-bold tracking-[0.16em] text-[#fcd65b] uppercase">
                          {item.label} · Summit 2026
                        </p>
                        <ul className="m-0 grid list-none gap-0.5 p-0">
                          {item.dropdownItems.map((subItem) => (
                            <li key={subItem.label}>
                              <MenuLink
                                href={subItem.href}
                                onClick={() => setOpenMenu(null)}
                                className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none"
                              >
                                <MenuEntry label={subItem.label} description={subItem.description} />
                              </MenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={item.label} className="relative">
                <Link
                  to={item.href}
                  className={`text-[14px] xl:text-[15.5px] tracking-wide transition-all duration-200 block ${
                    isActive
                      ? 'text-white font-semibold underline underline-offset-[10px] decoration-2 decoration-white'
                      : 'text-white/95 font-semibold hover:text-white hover:opacity-90'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
                {item.badge && (
                  <span className="pointer-events-none absolute -top-[18px] -right-10 flex -rotate-6 items-center gap-1 overflow-hidden rounded-md border-2 border-white bg-[linear-gradient(180deg,#fff3c4_0%,#fcd65b_55%,#f4a300_100%)] px-2 py-[3px] text-[8px] leading-none font-extrabold tracking-wider text-[#1c4fd1] uppercase shadow-[0_3px_7px_rgba(10,40,130,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white/35" />
                    <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4a8bff] opacity-80" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1c55d2]" />
                    </span>
                    {item.badge}
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        {/* Right: Sign In (or the account pill once signed in) */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                title={user.name}
                className="group relative flex h-[40px] max-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-full pr-3.5 pl-2 text-[15px] font-semibold tracking-wide text-[#1c55d2] transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 active:scale-95 sm:h-[44px]"
                style={{
                  background: 'linear-gradient(180deg, #fff9e6 0%, #fcd65b 45%, #f49e0b 100%)',
                  border: '2px solid rgba(255, 255, 255, 0.95)',
                  boxShadow:
                    '0 4px 16px rgba(245, 158, 11, 0.45), inset 0 1px 2px rgba(255, 255, 255, 1)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#1c55d2] text-white"
                >
                  <User className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="truncate">{firstName || 'Account'}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2.5}
                />
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className="absolute top-full right-0 z-50 mt-3 w-48 rounded-2xl p-1.5 backdrop-blur-md"
                  style={{
                    background: 'linear-gradient(135deg, #2b6fe9 0%, #1545b7 100%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.8)',
                    boxShadow:
                      '0 16px 36px rgba(15, 35, 110, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <Link
                    role="menuitem"
                    to="/my-team"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none"
                  >
                    <Users className="h-4 w-4 text-[#fcd65b]" strokeWidth={2.25} aria-hidden="true" />
                    My Team
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold text-white transition-colors hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none"
                  >
                    <LogOut className="h-4 w-4 text-[#fcd65b]" strokeWidth={2.25} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={signInHref}
              role="button"
              onClick={onSignIn}
              className="group relative h-[40px] sm:h-[44px] px-7 sm:px-9 lg:px-6 xl:px-9 rounded-full font-semibold text-[15px] sm:text-[16px] tracking-wide text-[#1c55d2] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #fff9e6 0%, #fcd65b 45%, #f49e0b 100%)',
                border: '2px solid rgba(255, 255, 255, 0.95)',
                boxShadow:
                  '0 4px 16px rgba(245, 158, 11, 0.45), inset 0 1px 2px rgba(255, 255, 255, 1)',
              }}
            >
              <span>Sign In</span>
            </Link>
          )}
        </div>
        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
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
          className="absolute top-full left-4 right-4 mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto p-5 rounded-3xl lg:hidden z-50 backdrop-blur-md flex flex-col gap-4 animate-in fade-in duration-200 pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, #2b6fe9 0%, #194dc4 100%)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 12px 30px rgba(10, 30, 90, 0.5)',
          }}
        >
          <ul className="flex flex-col gap-3 m-0 p-0 list-none font-['Poppins',sans-serif]">
            {navItems.map((item) => {
              const isActive = activeItem.toLowerCase() === item.label.toLowerCase()

              if (item.hasDropdown && item.dropdownItems) {
                const isOpen = mobileOpenMenu === item.label
                return (
                  <li key={item.label} className="border-b border-white/10 pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileOpenMenu(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between py-1 text-left text-[16px] font-medium text-white/90 hover:text-white"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`h-4 w-4 stroke-[2.5] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <ul className="m-0 mt-2 grid list-none gap-1 rounded-2xl bg-white/10 p-2">
                        {item.dropdownItems.map((subItem) => (
                          <li key={subItem.label}>
                            <MenuLink
                              href={subItem.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setMobileOpenMenu(null)
                              }}
                              className="group/item flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/15"
                            >
                              <MenuEntry label={subItem.label} description={subItem.description} />
                            </MenuLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              }

              return (
                <li key={item.label} className="border-b border-white/10 pb-2">
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-1 text-[16px] ${
                      isActive
                        ? 'text-white font-semibold underline underline-offset-4 decoration-2 decoration-white'
                        : 'text-white/90 font-medium hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="relative ml-2 inline-flex -rotate-3 items-center gap-1 overflow-hidden rounded-md border-2 border-white bg-[linear-gradient(180deg,#fff3c4_0%,#fcd65b_55%,#f4a300_100%)] px-2 py-[3px] align-middle text-[9px] leading-none font-extrabold tracking-wider text-[#1c4fd1] uppercase shadow-[0_3px_7px_rgba(10,40,130,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)]">
                        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white/35" />
                        <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4a8bff] opacity-80" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1c55d2]" />
                        </span>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="pt-2 flex flex-col items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/my-team"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full font-semibold text-[16px] text-[#1c55d2] transition-transform active:scale-95"
                  style={{
                    background: 'linear-gradient(180deg, #fff7dc 0%, #fbd558 46%, #f59e0b 100%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.95)',
                    boxShadow:
                      '0 4px 14px rgba(245, 158, 11, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                  }}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <User className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                    {firstName ? `${firstName} · My Team` : 'My Team'}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer text-[15px] font-semibold text-white/90 underline underline-offset-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={signInHref}
                role="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onSignIn?.()
                }}
                className="w-full py-2.5 text-center rounded-full font-semibold text-[16px] text-[#1c55d2] transition-transform active:scale-95"
                style={{
                  background: 'linear-gradient(180deg, #fff7dc 0%, #fbd558 46%, #f59e0b 100%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  boxShadow:
                    '0 4px 14px rgba(245, 158, 11, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                }}
              >
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default NavigationBar
