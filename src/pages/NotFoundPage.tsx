import type { CSSProperties, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

type OutlinedTextProps = {
  children: ReactNode
  className?: string
  stroke?: string
}

function OutlinedText({ children, className = '', stroke = '10px' }: OutlinedTextProps) {
  const strokeStyle: CSSProperties = {
    backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 115%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: `${stroke} transparent`,
    paintOrder: 'stroke fill',
    filter:
      'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
  }

  return (
    <span className="relative inline-block">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 select-none ${className}`}
        style={strokeStyle}
      >
        {children}
      </span>
      <span className={`relative block text-white ${className}`}>{children}</span>
    </span>
  )
}

const iconProps = {
  'aria-hidden': true,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function ArrowUpRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function ArrowLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  )
}

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="not-found-page relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#B7C3FF_0%,#7893F8_32%,#3B72F2_68%,#1E56E0_100%)] text-white">
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 pb-16 pt-32 text-center sm:gap-8 sm:px-10">
        {/* 404 */}
        <div
          aria-hidden="true"
          className="flex select-none items-center justify-center gap-1 text-[clamp(7rem,22vw,15rem)] font-extrabold leading-none tracking-[-0.04em] sm:gap-3"
        >
          <OutlinedText className="px-1 sm:px-3" stroke="clamp(8px, 1.4vw, 18px)">
            4
          </OutlinedText>

          <span className="grid size-[0.78em] place-items-center rounded-full border-[0.07em] border-white bg-white/10 shadow-[0_0_0_0.04em_rgba(0,63,158,0.85),0_0_44px_rgba(2,98,244,0.65),inset_0_0_36px_rgba(2,98,244,0.4)]">
            <span className="size-[24%] rounded-full bg-white shadow-[0_0_30px_10px_rgba(255,255,255,0.6)]" />
          </span>

          <OutlinedText className="px-1 sm:px-3" stroke="clamp(8px, 1.4vw, 18px)">
            4
          </OutlinedText>
        </div>

        {/* Copy */}
        <div className="flex max-w-xl flex-col items-center gap-3">
          <h1 className="font-extrabold italic leading-tight tracking-tight">
            <OutlinedText className="px-4 text-[clamp(2rem,6vw,4rem)]">Page not found</OutlinedText>
          </h1>
          <p className="max-w-[30rem] text-base leading-relaxed [text-shadow:0_2px_12px_rgba(0,63,158,0.65)] sm:text-lg">
            The page you are looking for does not exist or may have moved to a new address.
          </p>

          <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/80 bg-[linear-gradient(90deg,#FFF8E1_0%,#FFD66B_45%,#F7A81B_100%)] px-8 py-3.5 text-base font-semibold text-[#0B4FD6] shadow-[0_0_24px_rgba(255,255,255,0.5),0_10px_24px_rgba(247,168,27,0.4)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(255,255,255,0.75),0_14px_32px_rgba(247,168,27,0.55)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              Return to homepage
              <ArrowUpRightIcon className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-white/70 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/25 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
            >
              <ArrowLeftIcon className="size-5 transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:transition-none" />
              Go back
            </button>
          </div>
        </div>
      </main>
    </section>
  )
}

export default NotFoundPage
