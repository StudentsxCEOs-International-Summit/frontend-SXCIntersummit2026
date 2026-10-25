import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CardLabel, ContainShape } from '@/components/about/AboutShared'
import { useAuth } from '@/context/AuthContext'

/**
 * First-visit announcement. Edit this object to change what everyone sees; bump `id`
 * to show a new announcement again to people who already dismissed the old one.
 */
// TODO: replace the placeholder copy with the final announcement text.
export const broadcast = {
  id: 'ibcc-2026-launch',
  label: 'Information',
  title: 'Join IBCC 2026!',
  message:
    'Gather your team and get ready to take on real-world business cases at the International Business Case Competition 2026.',
  primaryLabel: 'Register Now',
  primaryHref: '/register',
  /** Where the button goes for someone who is already signed in. */
  primaryHrefSignedIn: '/team-register',
  secondaryLabel: 'Later',
}

const STORAGE_KEY = 'sxc-broadcast-seen'

function hasSeen(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === broadcast.id
  } catch {
    return false
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(STORAGE_KEY, broadcast.id)
  } catch {
    // Storage blocked (private mode): the announcement simply shows again next visit.
  }
}

function BroadcastModal() {
  const { user } = useAuth()
  const primaryHref = user ? broadcast.primaryHrefSignedIn : broadcast.primaryHref
  const [open, setOpen] = useState(false)
  const laterRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (hasSeen()) return
    const timer = window.setTimeout(() => setOpen(true), 600)
    return () => window.clearTimeout(timer)
  }, [])

  const close = useCallback(() => {
    markSeen()
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    laterRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  if (!open) return null

  return (
    <div
      className="animate-modal-fade fixed inset-0 z-[100] flex items-center justify-center bg-[#2f4fb8]/45 px-4 backdrop-blur-md"
      onClick={close}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="broadcast-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-pop relative w-full max-w-[520px] pt-8"
      >
        <div className="absolute top-0 left-1/2 z-10 w-44 -translate-x-1/2 sm:w-52">
          <CardLabel side="right" className="w-full" textClassName="text-sm sm:text-base">
            {broadcast.label}
          </CardLabel>
        </div>

        <div className="relative">
          <ContainShape variant="modal" />

          <button
            type="button"
            onClick={close}
            aria-label="Close announcement"
            className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[#0262F4] bg-white/70 text-[#0262F4] transition hover:bg-white focus-visible:ring-4 focus-visible:ring-[#0262F4]/30 focus-visible:outline-none"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="relative px-6 pt-12 pb-14 text-center sm:px-10">
            <h2
              id="broadcast-title"
              className="font-heading text-3xl leading-tight font-extrabold text-[#0b4fd1] sm:text-4xl"
            >
              {broadcast.title}
            </h2>
            <p className="font-body mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#3f4a63]">
              {broadcast.message}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                ref={laterRef}
                type="button"
                onClick={close}
                className="font-heading min-w-32 cursor-pointer rounded-full border border-[#0262F4] bg-white px-6 py-2 text-sm font-bold text-[#0b4fd1] transition hover:bg-[#eef4ff] focus-visible:ring-4 focus-visible:ring-[#0262F4]/30 focus-visible:outline-none"
              >
                {broadcast.secondaryLabel}
              </button>
              <Link
                to={primaryHref}
                onClick={close}
                className="bg-gold-gloss text-outline-sm font-heading inline-flex min-w-32 items-center justify-center rounded-full border border-white/90 px-6 py-2 text-sm font-bold shadow-[0_4px_14px_rgb(245_158_11/0.45)] transition-transform hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-[#f4a300]/40 focus-visible:outline-none active:scale-95"
              >
                {broadcast.primaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BroadcastModal
