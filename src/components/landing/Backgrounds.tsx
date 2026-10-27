import type { ReactNode } from 'react'
import blueDice from '@/assets/ic-blue-dice.svg'
import dice from '@/assets/ic-dice.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'
import blueDiamonds from '@/assets/ic-blue-diamonds.svg'
import brokenLine from '@/assets/ic-brokeline.svg'
import gradientLine from '@/assets/ic-gradient-line.svg'
import loopCurveLine from '@/assets/ic-loop-curveline.svg'

export interface BackgroundProps {
  className?: string
  children?: ReactNode
}

/** Shared classes for every decorative image (static – no animation). */
const deco = 'pointer-events-none absolute select-none max-w-none'

/**
 * Full-page background component positioned behind content.
 */
export function Backgrounds({ className = '', children }: BackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`bg-landing pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Ribbons and Strokes (white at ~25-35% opacity) */}
      {/* Ribbon 1: starts at left edge y 22%, dips toward center y 27%, rises at right edge y 25% */}
      <img
        src={gradientLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '22%',
          width: '100%',
          height: '7%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />

      {/* Diagonal stroke (ic-brokenline): x 0-15%, y 43-47%, angled down-right */}
      <img
        src={brokenLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '43%',
          width: '15%',
          height: '4.5%',
          objectFit: 'cover',
          objectPosition: 'left top',
          opacity: 0.3,
        }}
      />

      {/* Arc stroke (ic-brokenline): x 76-100%, y 46.5-53.5%, curving up toward the right */}
      <img
        src={brokenLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '76%',
          top: '46.5%',
          width: '24%',
          height: '7%',
          objectFit: 'cover',
          objectPosition: 'right bottom',
          opacity: 0.3,
        }}
      />

      {/* Ribbon 2: same shape as ribbon 1, y 70-77.5% */}
      <img
        src={gradientLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '70%',
          width: '100%',
          height: '7.5%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />

      {/* Ribbon 3: y 86.5-95%, knot at x 35-41%, y ~88%, then dips and rises to right edge */}
      <img
        src={loopCurveLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '86.5%',
          width: '100%',
          height: '8.5%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />

      {/* Glow Orbs */}
      {/* Glow orb left: x 0-8%, y 46-55%, light blue, soft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          left: '0%',
          top: '46%',
          width: '8%',
          height: '9%',
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(37, 99, 255, 0) 70%)',
        }}
      />

      {/* Glow orb right: x 85-100%, y 62-67%, near-white, soft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          left: '85%',
          top: '62%',
          width: '15%',
          height: '5%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(37, 99, 255, 0) 70%)',
        }}
      />

      {/* Decorative Objects */}
      {/* Gold sparkle star (ic-star-yellow-glow): x 85-100%, y 27-33% */}
      <img
        src={starYellowGlow}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '85%',
          top: '27%',
          width: '15%',
          height: '6%',
          objectFit: 'contain',
        }}
      />

      {/* Small blue star (ic-star-glow): x 0-11%, y 39-43% */}
      <img
        src={starGlow}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '39%',
          width: '11%',
          height: '4%',
          objectFit: 'contain',
        }}
      />

      {/* Gold die (ic-dice): x 91-100%, y 50.5-54% */}
      <img
        src={dice}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '91%',
          top: '50.5%',
          width: '9%',
          height: '3.5%',
          objectFit: 'contain',
        }}
      />

      {/* Blue die (ic-blue-dice): x 0-9.5%, y 58-62% */}
      <img
        src={blueDice}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '58%',
          width: '9.5%',
          height: '4%',
          objectFit: 'contain',
        }}
      />

      {/* Gold pinwheel: x 90-100%, y 68-72% (reused ic-blue-diamonds.svg with gold CSS filter) */}
      <img
        src={blueDiamonds}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '90%',
          top: '68%',
          width: '10%',
          height: '4%',
          objectFit: 'contain',
          filter: 'hue-rotate(175deg) saturate(1.8) brightness(1.15)',
        }}
      />

      {/* Ice-blue pinwheel: x 0-12%, y 73.5-79% (filter: brightness(1.6) saturate(0.3) and opacity 0.7) */}
      <img
        src={blueDiamonds}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '73.5%',
          width: '12%',
          height: '5.5%',
          objectFit: 'contain',
          filter: 'brightness(1.6) saturate(0.3)',
          opacity: 0.7,
        }}
      />

      {children}
    </div>
  )
}

/** Alias for Backgrounds component */
export const Background = Backgrounds

/**
 * Wraps a group of sections with its own background layer.
 * `isolate` + `-z-10` keeps the decorations behind the content but above the page background.
 */
export function BackgroundSection({
  background,
  className = '',
  children,
}: {
  background?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`isolate sm:min-h-screen flex relative flex-col gap-12 sm:gap-32 py-12 sm:py-16 ${className}`}
    >
      {background && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {background}
        </div>
      )}
      {children}
    </section>
  )
}

/* ─────────────── Band 1 · About (y ~20–43%) ─────────────── */
export function AboutBackground() {
  return (
    <>
      {/* Ribbon 1 (ic-gradient-line): starts at left edge y 22%, dips toward center y 27%, rises at right edge y 25% */}
      <img
        src={gradientLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '4%',
          width: '100%',
          height: '32%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />

      {/* Gold sparkle star (ic-star-yellow-glow): x 85-100%, y 27-33% */}
      <img
        src={starYellowGlow}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '85%',
          top: '28%',
          width: '15%',
          height: '28%',
          objectFit: 'contain',
          objectPosition: 'right center',
        }}
      />

      {/* Small blue star (ic-star-glow): x 0-11%, y 39-43% */}
      <img
        src={starGlow}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '80%',
          width: '11%',
          height: '20%',
          objectFit: 'contain',
          objectPosition: 'left center',
        }}
      />
    </>
  )
}

/* ─────────────── Band 2 · Timeline (y ~43–67%) ─────────────── */
export function TimelineBackground() {
  return (
    <>
      {/* Diagonal stroke (ic-brokenline): x 0-15%, y 43-47%, angled down-right */}
      <img
        src={brokenLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '2%',
          width: '15%',
          height: '20%',
          objectFit: 'cover',
          objectPosition: 'left top',
          opacity: 0.3,
        }}
      />

      {/* Arc stroke (ic-brokenline): x 76-100%, y 46.5-53.5%, curving up toward the right */}
      <img
        src={brokenLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '76%',
          top: '16%',
          width: '24%',
          height: '32%',
          objectFit: 'cover',
          objectPosition: 'right bottom',
          opacity: 0.3,
        }}
      />

      {/* Glow orb left: x 0-8%, y 46-55%, light blue, soft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          left: '0%',
          top: '14%',
          width: '8%',
          height: '40%',
          background:
            'radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(37, 99, 255, 0) 70%)',
        }}
      />

      {/* Glow orb right: x 85-100%, y 62-67%, near-white, soft */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full blur-2xl"
        style={{
          left: '85%',
          top: '78%',
          width: '15%',
          height: '24%',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(37, 99, 255, 0) 70%)',
        }}
      />

      {/* Gold die (ic-dice): x 91-100%, y 50.5-54% */}
      <img
        src={dice}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '91%',
          top: '34%',
          width: '9%',
          height: '18%',
          objectFit: 'contain',
          objectPosition: 'right center',
        }}
      />

      {/* Blue die (ic-blue-dice): x 0-9.5%, y 58-62% */}
      <img
        src={blueDice}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '68%',
          width: '9.5%',
          height: '18%',
          objectFit: 'contain',
          objectPosition: 'left center',
        }}
      />
    </>
  )
}

/* ─────────────── Band 3 · Competitions + Events (y ~67–82%) ─────────────── */
export function ProgramsBackground() {
  return (
    <>
      {/* Ribbon 2 (ic-gradient-line): same shape as ribbon 1, y 70-77.5% */}
      <img
        src={gradientLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '20%',
          width: '100%',
          height: '38%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />

      {/* Gold pinwheel: x 90-100%, y 68-72% */}
      <img
        src={blueDiamonds}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '90%',
          top: '8%',
          width: '10%',
          height: '22%',
          objectFit: 'contain',
          objectPosition: 'right center',
          filter: 'hue-rotate(175deg) saturate(1.8) brightness(1.15)',
        }}
      />

      {/* Ice-blue pinwheel: x 0-12%, y 73.5-79% */}
      <img
        src={blueDiamonds}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '42%',
          width: '12%',
          height: '28%',
          objectFit: 'contain',
          objectPosition: 'left center',
          filter: 'brightness(1.6) saturate(0.3)',
          opacity: 0.7,
        }}
      />
    </>
  )
}

/* ─────────────── Band 4 · FAQ + Partners + Contact (y ~82–100%) ─────────────── */
export function PartnersBackground() {
  return (
    <>
      {/* Ribbon 3 (ic-loop-curveline): y 86.5-95%, knot at x 35-41%, y ~88% */}
      <img
        src={loopCurveLine}
        alt=""
        aria-hidden
        className={deco}
        style={{
          left: '0%',
          top: '22%',
          width: '100%',
          height: '45%',
          objectFit: 'cover',
          opacity: 0.3,
        }}
      />
    </>
  )
}

export default Backgrounds
