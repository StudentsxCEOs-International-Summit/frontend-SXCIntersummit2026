import type { ReactNode } from 'react'
import wave from '@/assets/About/ic-wave.svg'
import brokeLine from '@/assets/ic-brokeline.svg'
import loopCurveLine from '@/assets/ic-loopcurveline.svg'
import dice from '@/assets/ic-dice.svg'
import blueDice from '@/assets/ic-bluedice.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import blueDiamonds from '@/assets/ic-bluediamonds.svg'
import starGlow from '@/assets/ic-star_glow.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'

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
    <section className={`isolate min-h-screen flex relative flex-col gap-12 sm:gap-32 py-12 sm:py-16 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
      <img src={wave} alt="" className={`${deco} top-[4%] -left-[10%] w-[120%] opacity-80`} />
      {/* Yellow star peeking from the right */}
      <img src={starYellowGlow} alt="" className={`${sideDeco} top-[18%] -right-32 w-72 rotate-12`} />
      {/* Blue star on the left, lower down */}
      <img src={starGlow} alt="" className={`${sideDeco} bottom-[2%] -left-28 w-64 -rotate-12 opacity-90`} />
    </>
  )
}

/* ─────────────── Band 2 · Timeline ─────────────── */
export function TimelineBackground() {
  return (
    <>
      {/* Faint arc sweeping in from the right */}
      <img src={brokeLine} alt="" className={`${deco} top-[5%] left-0 w-full opacity-40`} />
      {/* Yellow dice on the right, blue dice on the left */}
      <img src={dice} alt="" className={`${sideDeco} top-[30%] -right-16 w-48 rotate-12`} />
      <img src={blueDice} alt="" className={`${sideDeco} top-[60%] -left-16 w-48 -rotate-12`} />
    </>
  )
}

/* ─────────────── Band 3 · Competitions + Events ─────────────── */
export function ProgramsBackground() {
  return (
    <>
      {/* Yellow diamonds on the right */}
      <img src={diamonds} alt="" className={`${sideDeco} top-[10%] -right-20 w-56 rotate-12`} />
      {/* Ribbon crossing the middle */}
      <img src={wave} alt="" className={`${deco} top-[22%] -left-[10%] w-[120%] opacity-60`} />
      {/* Blue diamonds on the left */}
      <img src={blueDiamonds} alt="" className={`${sideDeco} top-[30%] -left-20 w-52 -rotate-12`} />
    </>
  )
}

/* ─────────────── Band 4 · FAQ + Partners + Contact ─────────────── */
export function PartnersBackground() {
  return (
    <>
      {/* Looping line near the top of the band */}
      <img src={loopCurveLine} alt="" className={`${deco} top-[5%] left-0 w-full opacity-60`} />
    </>
  )
}



