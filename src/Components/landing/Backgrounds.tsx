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
    <div className={`relative isolate flex flex-col gap-24 py-12 sm:gap-32 sm:py-16 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {background}
      </div>
      {children}
    </div>
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

      {/* Diagonal light beams */}
      <img src={brokeLine} alt="" className={`${deco} inset-0 h-full w-full object-cover`} />
      {/* Glows left + right */}
      <div className="absolute top-[40%] -left-40 h-[420px] w-[420px] rounded-full bg-white/20 blur-[120px]" />
      <div className="absolute top-[10%] -right-40 h-[360px] w-[360px] rounded-full bg-white/15 blur-[120px]" />

      <img src={starGlow} alt="" className={`${sideDeco} top-8 -left-24 w-60 -rotate-12`} />
      <img src={blueDice} alt="" className={`${sideDeco} bottom-[12%] -left-10 w-40 md:w-72 rotate-12`} />
      <img src={dice} alt="" className={`${sideDeco} top-[55%] -right-12 w-36 -rotate-12`} />
    </>
  )
}

/* ─────────────── Band 3 · Competitions + Events ─────────────── */
export function ProgramsBackground() {
  return (
    <>

      {/* Ribbon, mirrored so it flows the other way */}
      <img src={wave} alt="" className={`${deco} top-[45%] -left-[10%] w-[120%] -scale-x-100 opacity-60`} />
      <div className="absolute top-[30%] -right-40 h-[420px] w-[420px] rounded-full bg-white/15 blur-[120px]" />

      <img src={diamonds} alt="" className={`${sideDeco} top-[30%] -right-28 w-72 rotate-45`} />
      <img src={blueDiamonds} alt="" className={`${sideDeco} top-[60%] -left-20 w-60`} />
    </>
  )
}

/* ─────────────── Band 4 · FAQ + Partners + Contact ─────────────── */
export function PartnersBackground() {
  return (
    <>

      {/* Diagonal light beams (flipped vertically to vary from the Timeline band) */}
      <img src={brokeLine} alt="" className={`${deco} inset-0 h-full w-full -scale-y-100 object-cover`} />
      {/* Looping line near the bottom */}
      <img src={loopCurveLine} alt="" className={`${deco} bottom-[8%] left-0 w-full`} />

      <img src={blueDice} alt="" className={`${sideDeco} top-[15%] -right-30 w-40 sm:w-80 -rotate-32`} />
      <img src={dice} alt="" className={`${sideDeco} top-[50%] -left-14 w-44 rotate-12`} />
    </>
  )
}
