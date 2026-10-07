import type { CSSProperties, ReactNode } from 'react'
import titleLeft from '@/assets/About/ic-containTitleLeft.svg'
import titleRight from '@/assets/About/ic-containTitleRight.svg'

/**
 * Small building blocks shared by the About page sections.
 * Kept inside `Components/about` so the About page stays self-contained.
 */

const strokeStyle = (width: number): CSSProperties => ({
  backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: `${width}px transparent`,
  paintOrder: 'stroke fill',
  filter:
    'drop-shadow(0 0 10px rgba(2, 98, 244, 0.45)) drop-shadow(0 3px 8px rgba(0, 63, 158, 0.55))',
})

/** White text with the blue gradient outline + glow used across the design. */
export function OutlinedText({
  children,
  className = '',
  stroke = 8,
}: {
  children: ReactNode
  className?: string
  stroke?: number
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none"
        style={strokeStyle(stroke)}
      >
        {children}
      </span>
      <span className="relative text-white">{children}</span>
    </span>
  )
}

/** Blue glass pill used for section titles ("Our Values", "Our Milestones", ...). */
export function AboutPill({
  children,
  id,
  className = '',
}: {
  children: ReactNode
  id?: string
  className?: string
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <h2
        id={id}
        className="bg-glass-blue rounded-2xl border-2 border-white/90 px-8 py-2.5 text-center shadow-[0_0_30px_rgba(2,98,244,0.6)] sm:min-w-[300px] sm:px-12"
      >
        <OutlinedText
          stroke={6}
          className="font-heading text-xl leading-tight font-extrabold tracking-tight italic md:text-[1.75rem]"
        >
          {children}
        </OutlinedText>
      </h2>
    </div>
  )
}

/** Orange trapezoid label that sits on top of a card (uses the Figma-exported SVG shapes). */
export function CardLabel({
  side,
  children,
  className = '',
  textClassName = 'text-sm sm:text-lg',
}: {
  side: 'left' | 'right'
  children: ReactNode
  className?: string
  textClassName?: string
}) {
  const isLeft = side === 'left'
  return (
    <div className={`relative ${isLeft ? 'aspect-[477/83]' : 'aspect-[378/83]'} ${className}`}>
      <img
        src={isLeft ? titleLeft : titleRight}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
      <span
        className={`absolute top-[6%] bottom-[16%] flex items-center justify-center ${
          isLeft ? 'right-[4%] left-[6%]' : 'right-[6%] left-[3%]'
        }`}
      >
        <OutlinedText
          stroke={5}
          className={`font-heading leading-none font-extrabold whitespace-nowrap italic ${textClassName}`}
        >
          {children}
        </OutlinedText>
      </span>
    </div>
  )
}

/**
 * Light glass card with an angled edge and gradient border.
 * The angled clip-path is only applied from `md` up so text never gets cut on phones.
 */
export function AngledPanel({
  clip,
  children,
  className = '',
  innerClassName = '',
  tone = 'light',
}: {
  clip: string
  children: ReactNode
  className?: string
  innerClassName?: string
  tone?: 'light' | 'blue'
}) {
  const clipVar = { '--clip': clip } as CSSProperties
  const fill =
    tone === 'light'
      ? 'bg-[linear-gradient(165deg,#ffffff_0%,#e3eeff_45%,#8BB9F4_100%)]'
      : 'bg-glass-blue'
  return (
    <div
      className={`relative ${className}`}
      style={{ filter: 'drop-shadow(-2px 5px 3px rgba(0, 0, 0, 0.22))' }}
    >
      <div
        className="absolute inset-0 rounded-[18px] bg-[linear-gradient(160deg,#ffffff_0%,rgba(2,98,244,0.15)_50%,#003F9E_100%)] md:[clip-path:var(--clip)]"
        style={clipVar}
      />
      <div
        className={`absolute inset-[4px] rounded-[14px] ${fill} md:[clip-path:var(--clip)]`}
        style={clipVar}
      />
      <div className={`relative ${innerClassName}`}>{children}</div>
    </div>
  )
}

/** Shared body copy colour on the light cards. */
export const cardText = 'text-[#0b3d91]'
