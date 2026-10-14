import type { ReactNode } from 'react'
import wave from '@/assets/About/ic-wave.svg'
import loopCurveLine from '@/assets/ic-loopcurveline.svg'
import blueDiamonds from '@/assets/ic-bluediamonds.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'
import key from '@/assets/ic-key.svg'
import yellowChess from '@/assets/ic-yellowchess.svg'

/** Shared classes for every decorative image (static – no animation). */
const deco = 'pointer-events-none absolute select-none max-w-none'
/** Side objects (dice, diamonds, stars) are hidden on mobile so they don't cover content. */
const sideDeco = `${deco} hidden md:block`

/**
 * Wraps a group of sections with its own background layer.
 * `isolate` + `-z-10` keeps the decorations behind the content but above the page gradient.
 */
export function BackgroundSection({
  background,
  className = '',
  children,
}: {
  background: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`min-h-screen flex relative flex-col gap-12 sm:gap-32 py-12 sm:py-16 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {background}
      </div>
      {children}
    </section>
  )
}

/* ─────────────── Band 1 · About ─────────────── */
export function AboutBackground() {
  return (
    <>
      {/* Ribbon across the top */}
      <img src={wave} alt="" className={`${deco} top-0 -left-[10%] w-[120%] opacity-80`} />
      {/* Soft light on the right */}
      <div className="absolute top-[20%] -right-40 h-[480px] w-[480px] rounded-full bg-white/15 blur-[120px]" />
      <img src={starYellowGlow} alt="" className={`${sideDeco} top-[35%] -right-36 w-80`} />
    </>
  )
}

/* ─────────────── Band 2 · Timeline ─────────────── */
export function TimelineBackground() {
  return (
    <>
      <img
        src={key}
        alt=""
        className={`${sideDeco} top-[30%] -left-12 w-32 rotate-12 filter grayscale brightness-125 hue-rotate-180`}
      />
      <img src={key} alt="" className={`${sideDeco} top-[55%] right-0 w-32 -rotate-12`} />
    </>
  )
}

/* ─────────────── Band 3 · Competitions + Events ─────────────── */
export function ProgramsBackground() {
  return (
    <>
      <img src={yellowChess} alt="" className={`${sideDeco} top-[20%] -left-8 w-32 -rotate-12`} />
      <img src={blueDiamonds} alt="" className={`${sideDeco} top-[40%] right-0 w-40 rotate-12`} />

      {/* Looping line near the bottom */}
      <img src={loopCurveLine} alt="" className={`${deco} bottom-[5%] left-0 w-full opacity-60`} />
    </>
  )
}

/* ─────────────── Band 4 · FAQ + Partners + Contact ─────────────── */
export function PartnersBackground() {
  return <></>
}
