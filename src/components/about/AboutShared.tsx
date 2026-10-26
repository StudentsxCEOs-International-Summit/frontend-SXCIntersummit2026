import type { CSSProperties, ReactNode } from 'react'
import { SectionTitle } from '@/components/landing/ui'
import titleLeft from '@/assets/about/ic-contain-title-left.svg'
import titleRight from '@/assets/about/ic-contain-title-right.svg'
import visionLeft from '@/assets/about/ic-vision-left.svg'
import visionRight from '@/assets/about/ic-vision-right.svg'

/**
 * Small building blocks shared by the About page sections.
 * Kept inside `components/about` so the About page stays self-contained.
 */

/**
 * White text with a blue outline + soft glow used across the design.
 * Single layer on purpose: the old two-layer gradient-stroke trick drifted out of
 * alignment and left blocky dark patches behind the letters.
 */
export function OutlinedText({
  children,
  className = '',
  stroke = 8,
}: {
  children: ReactNode
  className?: string
  stroke?: number
}) {
  // Outline built from ring of text-shadows: unlike -webkit-text-stroke it never
  // produces mitred spikes or jagged inner contours on overlapping glyph paths.
  const radius = Math.max(1, stroke * 0.3)
  const ring = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2
    const x = (Math.cos(angle) * radius).toFixed(2)
    const y = (Math.sin(angle) * radius).toFixed(2)
    return `${x}px ${y}px 0 #0a4fd1`
  })
  const style: CSSProperties = {
    color: '#ffffff',
    textShadow: [...ring, '0 3px 8px rgba(0, 63, 158, 0.55)', '0 0 14px rgba(2, 98, 244, 0.45)'].join(', '),
  }
  return (
    <span className={`inline-block ${className}`} style={style}>
      {children}
    </span>
  )
}
/**
 * The Figma "container" card outlines, redrawn as inline SVG. They stretch to any
 * width/height (preserveAspectRatio="none") while the 5px edge keeps its thickness
 * (non-scaling-stroke), so the card can be wide without growing tall.
 * Paths and gradients are copied from ic-contain-mainright.svg / ic-contain-main-left.svg.
 */
const containShapes = {
  right: {
    viewBox: '0 0 1202 344',
    fillPath:
      'M5.45117 300.622C5.45117 308.907 12.1669 315.622 20.4512 315.622H334.06C337.019 315.622 339.912 316.498 342.375 318.138L363.915 332.484C366.378 334.125 369.271 335 372.23 335H1113.1C1120.05 335 1126.09 330.226 1127.69 323.463L1200.07 18.4634C1202.31 9.04057 1195.16 0 1185.48 0H20.4512C12.1669 0 5.45117 6.71571 5.45117 15V300.622Z',
    strokePath:
      'M372.229 332.5H1113.1C1118.89 332.5 1123.92 328.521 1125.26 322.886L1197.64 17.8857C1199.5 10.0336 1193.54 2.5 1185.47 2.5H20.4512C13.5476 2.5 7.95117 8.09644 7.95117 15V300.622C7.95117 307.526 13.5476 313.122 20.4512 313.122H334.06C337.512 313.122 340.887 314.144 343.761 316.058L365.301 330.403C367.353 331.77 369.764 332.5 372.229 332.5Z',
    fill: { x1: 150.521, y1: 690.5, x2: 511.521, y2: 150, from: '#8BB9F4', to: '#FFFFFF' },
    stroke: { x1: 594.424, y1: 335, x2: 827.03, y2: -61.0354 },
  },
  left: {
    viewBox: '0 0 1199 356',
    fillPath:
      'M1197.27 55.2187C1197.27 46.9344 1190.55 40.2187 1182.27 40.2187H869.933C867.031 40.2187 864.191 39.3768 861.758 37.7951L840.24 23.8074C837.807 22.2256 834.967 21.3838 832.065 21.3838H334.907C332.557 21.3838 330.24 20.8317 328.143 19.7721L292.197 1.61166C290.1 0.552051 287.783 0 285.433 0H20.4544C11.3347 0 4.32524 8.07047 5.6022 17.1003L50.4307 334.1C51.477 341.5 57.8101 347 65.2829 347H1182.27C1190.55 347 1197.27 340.284 1197.27 332V55.2187Z',
    strokePath:
      'M285.433 2.5H20.4541C12.8546 2.50018 7.01325 9.22535 8.07715 16.75L52.9062 333.75C53.7782 339.916 59.0559 344.5 65.2832 344.5H1182.27C1189.17 344.5 1194.77 338.904 1194.77 332V55.2188C1194.77 48.3152 1189.17 42.7188 1182.27 42.7188H869.934C866.548 42.7188 863.234 41.7368 860.396 39.8916L838.878 25.9033C836.85 24.5852 834.483 23.8838 832.064 23.8838H334.906C332.165 23.8837 329.462 23.2399 327.016 22.0039L291.069 3.84277C289.322 2.95987 287.391 2.5 285.433 2.5Z',
    fill: { x1: 600.225, y1: 21.3838, x2: 1012.46, y2: 799.812, from: '#FFFFFF', to: '#8BB9F4' },
    stroke: { x1: 610.709, y1: 0, x2: 365.261, y2: 401.794 },
  },
  modal: {
    viewBox: '0 0 520 280',
    fillPath:
      'M20 0H500A20 20 0 0 1 520 20V260A20 20 0 0 1 500 280H165L145 262H20A20 20 0 0 1 0 242V20A20 20 0 0 1 20 0Z',
    strokePath:
      'M20 2.5H500A17.5 17.5 0 0 1 517.5 20V260A17.5 17.5 0 0 1 500 277.5H166L146 259.5H20A17.5 17.5 0 0 1 2.5 242V20A17.5 17.5 0 0 1 20 2.5Z',
    fill: { x1: 520, y1: 0, x2: 150, y2: 230, from: '#C3D9FA', to: '#FFFFFF' },
    stroke: { x1: 260, y1: 0, x2: 260, y2: 280 },
  },} as const

export function ContainShape({
  variant,
  className = '',
}: {
  variant: keyof typeof containShapes
  className?: string
}) {
  const s = containShapes[variant]
  const id = `about-contain-${variant}`
  return (
    <svg
      viewBox={s.viewBox}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible drop-shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] ${className}`}
    >
      <defs>
        <linearGradient
          id={`${id}-fill`}
          gradientUnits="userSpaceOnUse"
          x1={s.fill.x1}
          y1={s.fill.y1}
          x2={s.fill.x2}
          y2={s.fill.y2}
        >
          <stop stopColor={s.fill.from} />
          <stop offset="1" stopColor={s.fill.to} />
        </linearGradient>
        <linearGradient
          id={`${id}-stroke`}
          gradientUnits="userSpaceOnUse"
          x1={s.stroke.x1}
          y1={s.stroke.y1}
          x2={s.stroke.x2}
          y2={s.stroke.y2}
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#0262F4" stopOpacity="0" />
          <stop offset="1" stopColor="#003F9E" />
        </linearGradient>
      </defs>
      <path d={s.fillPath} fill={`url(#${id}-fill)`} />
      <path
        d={s.strokePath}
        stroke={`url(#${id}-stroke)`}
        strokeWidth={5}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
/**
 * Section title pill ("Our Values", "Our Milestones", ...). Reuses the Home page's
 * SectionTitle so the size, outline and centering match Home exactly.
 */
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
    <div className={`-mb-6 pb-6 ${className}`}>
      <SectionTitle
        id={id}
        className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]"
      >
        {children}
      </SectionTitle>
    </div>
  )
}
/** Orange trapezoid label that sits on top of a card (uses the Figma-exported SVG shapes). */
export function CardLabel({
  side,
  children,
  className = '',
  textClassName = 'text-xs sm:text-base',
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
        className={`absolute top-[6%] bottom-[16%] flex items-center justify-center ${isLeft ? 'right-[4%] left-[6%]' : 'right-[6%] left-[3%]'
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
 * Angled panel container using ic-visionLeft / ic-visionRight SVGs directly.
 */
export function AngledPanel({
  side = 'left',
  children,
  className = '',
  innerClassName = '',
}: {
  side?: 'left' | 'right'
  clip?: string
  children: ReactNode
  className?: string
  innerClassName?: string
  tone?: 'light' | 'blue'
}) {
  const isLeft = side === 'left'
  // The angled SVG has a fixed shape, so on phones (where the copy wraps onto more lines) it is
  // swapped for a plain card that grows with its content; md and up keep the Figma shape.
  const aspect = isLeft ? 'md:aspect-[626/197]' : 'md:aspect-[621/193]'
  return (
    <div className={`relative w-full ${aspect} ${className}`}>
      <img
        src={isLeft ? visionLeft : visionRight}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full select-none md:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(170deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] md:hidden"
      />
      <div className={`relative flex h-full w-full items-center justify-center ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
/**
 * Gradient edge for the tilted glass cards (Our Values, Benefits): navy on the top/right,
 * white on the bottom/left, so the 3D lean reads clearly. Drawn with a masked ::before so
 * the card keeps its translucent fill.
 */
export const glassCardEdge =
  "relative before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px] before:content-[''] before:bg-[linear-gradient(215deg,#0a3a8a_0%,#0b4aa8_28%,#ffffff_62%,#ffffff_100%)] before:[mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] before:[mask-clip:content-box,border-box] before:[mask-composite:exclude] before:[-webkit-mask-image:linear-gradient(#000_0_0),linear-gradient(#000_0_0)] before:[-webkit-mask-clip:content-box,border-box] before:[-webkit-mask-composite:xor]"
/** Shared body copy colour on the light cards. */
export const cardText = 'text-[#0b3d91]'
