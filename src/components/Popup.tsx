import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import popupContainer from '@/assets/ic-popupContainer.svg'

const POPUP_SEEN_KEY = 'sxc-home-popup-seen'

/**
 * Show the popup only on the first visit of a browser session (new tab / new visit).
 * sessionStorage survives page refreshes and in-app navigation, so the popup won't
 * reappear after a refresh or after coming back from another page.
 */
function shouldShowPopup() {
  try {
    return sessionStorage.getItem(POPUP_SEEN_KEY) !== 'true'
  } catch {
    return true
  }
}

interface PopupProps {
  title?: string
  description?: string
  registerHref?: string
}

function Popup({
  title = 'Join IBCC 2026!',
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966,",
  registerHref = '/register',
}: PopupProps) {
  const [isOpen, setIsOpen] = useState(shouldShowPopup)
  const [isVisible, setIsVisible] = useState(false)

  const close = useCallback(() => {
    setIsVisible(false)
    window.setTimeout(() => setIsOpen(false), 250)
  }, [])

  useEffect(() => {
    if (!isOpen) return

    try {
      sessionStorage.setItem(POPUP_SEEN_KEY, 'true')
    } catch {
      /* storage unavailable – ignore */
    }

    // Trigger enter transition on next frame
    const frame = requestAnimationFrame(() => setIsVisible(true))

    // Lock page scroll while the popup is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4 transition-opacity duration-250 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[781px] transition-all duration-250 ease-out ${
          isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Card frame */}
        <img
          src={popupContainer}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none"
        />

        {/* "Information" tab */}
        <div className="absolute -top-5 left-1/2 z-10 -translate-x-[45%] sm:-top-7">
          <div
            className="px-10 py-1.5 sm:px-16 sm:py-2.5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 88% 100%, 4% 100%)',
              backgroundImage: 'linear-gradient(90deg, #f4a300 0%, #f8ba48 45%, #fff6e0 100%)',
            }}
          >
            <span className="text-outline-blue font-heading text-base font-extrabold sm:text-2xl">
              Information
            </span>
          </div>
        </div>

        {/* Close button */}
        <button
          id="popup-close-button"
          type="button"
          onClick={close}
          aria-label="Close popup"
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#8bb9f4] bg-white/60 text-[#0a3fb8] transition-all duration-200 hover:scale-110 hover:bg-white focus-visible:ring-4 focus-visible:ring-[#8bb9f4]/60 focus-visible:outline-none active:scale-95 sm:top-8 sm:right-8 sm:h-12 sm:w-12"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3.5}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative flex flex-col items-center px-6 pt-14 pb-12 text-center sm:px-16 sm:pt-20 sm:pb-20">
          <h2
            id="popup-title"
            className="bg-[linear-gradient(90deg,#003F9E_0%,#0262F4_100%)] bg-clip-text font-heading text-2xl font-extrabold text-transparent sm:text-5xl"
          >
            {title}
          </h2>

          <p
            id="popup-description"
            className="mt-3 max-w-[560px] font-body text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-lg"
          >
            {description}
          </p>

          <div className="mt-6 flex w-full max-w-[530px] flex-col gap-3 sm:mt-9 sm:flex-row sm:gap-5">
            <button
              id="popup-later-button"
              type="button"
              onClick={close}
              className="flex-1 rounded-full border-2 border-[#0262f4] bg-[linear-gradient(90deg,#ffffff_55%,#bfd3f5_100%)] px-6 py-2.5 font-heading text-base font-bold text-[#0a3fb8] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_4px_16px_rgb(2_98_244/0.3)] focus-visible:ring-4 focus-visible:ring-[#0262f4]/30 focus-visible:outline-none active:scale-95 sm:text-lg"
            >
              Later
            </button>
            <Link
              id="popup-register-button"
              to={registerHref}
              onClick={close}
              className="bg-gold-gloss text-outline-sm flex flex-1 items-center justify-center rounded-full border-2 border-[#f8ba48] px-6 py-2.5 font-heading text-base font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-all duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-[#f8ba48]/60 focus-visible:outline-none active:scale-95 sm:text-lg"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
