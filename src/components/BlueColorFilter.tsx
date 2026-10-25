import React, { useMemo } from 'react'
import { BLUE_COLOR_FILTER_ID, BLUE_COLOR_FILTER_GLOW_ID } from './blueFilterConstants'

export { BLUE_COLOR_FILTER_ID, BLUE_COLOR_FILTER_GLOW_ID }

/**
 * Palette configuration for the duotone filter
 */
export interface DuotonePalette {
  /** Deep shadow color (luminance = 0). Default: Deep Royal Navy #010d73 */
  shadow?: string
  /** Mid-dark shadow color (luminance ~ 0.2). Default: Deep Sapphire #051fb3 */
  midDark?: string
  /** Dark midtone color (luminance ~ 0.4). Default: Intense Cobalt #0f40eb */
  darkMid?: string
  /** Vibrant midtone (luminance ~ 0.6). Default: Electric Royal Blue #2e73ff */
  midtone?: string
  /** Bright midtone (luminance ~ 0.8). Default: Celestial Sky Blue #80b8ff */
  bright?: string
  /** Soft highlight (luminance ~ 0.92). Default: Atmospheric Haze #d1e6ff */
  softHighlight?: string
  /** Highlight color (luminance = 1.0). Default: Pure White Bloom #ffffff */
  highlight?: string
}

export interface BlueColorFilterDefsProps {
  /**
   * The primary ID for the base duotone filter.
   * Can be referenced in CSS via `filter: url(#id)`.
   * @default 'blue-color-filter'
   */
  id?: string
  /**
   * Optional custom duotone palette
   */
  palette?: DuotonePalette
  /**
   * Contrast boost curve (0.8 to 1.6). Default: 1.25
   */
  contrast?: number
}

/**
 * Helper to convert hex to normalized [0, 1] RGB tuple
 */
function hexToNormalizedRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '').trim()
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex
  const num = parseInt(fullHex, 16)
  if (isNaN(num)) return [0, 0, 0]
  return [
    Math.round(((num >> 16) & 255) / 2.55) / 100,
    Math.round(((num >> 8) & 255) / 2.55) / 100,
    Math.round((num & 255) / 2.55) / 100,
  ]
}

/**
 * Generates the SVG duotone filter primitives
 */
function renderFilterElements(
  id: string,
  tableR: string,
  tableG: string,
  tableB: string,
  contrast: number,
) {
  const glowId = `${id}-glow`
  const grainId = `${id}-grain`
  const contrastIntercept = ((1 - contrast) * 0.5).toFixed(3)

  return (
    <>
      {/* 1. Core Duotone Filter (True Royal Blue Duotone with feComponentTransfer) */}
      <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        {/* Step 1: Accurate ITU-R BT.709 Grayscale Luminance Conversion */}
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0      0      0      1 0"
          result="luminance"
        />

        {/* Step 2: High-contrast S-curve tone adjustment */}
        <feComponentTransfer in="luminance" result="contrastGray">
          <feFuncR type="linear" slope={contrast} intercept={contrastIntercept} />
          <feFuncG type="linear" slope={contrast} intercept={contrastIntercept} />
          <feFuncB type="linear" slope={contrast} intercept={contrastIntercept} />
        </feComponentTransfer>

        {/* Step 3: Gradient Duotone Mapping (Deep Royal Navy -> Vibrant Cobalt -> Pure White Bloom) */}
        <feComponentTransfer in="contrastGray" result="duotone">
          <feFuncR type="table" tableValues={tableR} />
          <feFuncG type="table" tableValues={tableG} />
          <feFuncB type="table" tableValues={tableB} />
          <feFuncA type="identity" />
        </feComponentTransfer>
      </filter>

      {/* 2. Self-contained Duotone + Internal Optical Bloom Filter */}
      <filter
        id={glowId}
        x="-30%"
        y="-30%"
        width="160%"
        height="160%"
        colorInterpolationFilters="sRGB"
      >
        <feColorMatrix
          type="matrix"
          values="0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0.2126 0.7152 0.0722 0 0
                  0      0      0      1 0"
          result="luminance"
        />
        <feComponentTransfer in="luminance" result="contrastGray">
          <feFuncR type="linear" slope={contrast} intercept={contrastIntercept} />
          <feFuncG type="linear" slope={contrast} intercept={contrastIntercept} />
          <feFuncB type="linear" slope={contrast} intercept={contrastIntercept} />
        </feComponentTransfer>
        <feComponentTransfer in="contrastGray" result="baseDuotone">
          <feFuncR type="table" tableValues={tableR} />
          <feFuncG type="table" tableValues={tableG} />
          <feFuncB type="table" tableValues={tableB} />
        </feComponentTransfer>

        {/* Extract brightest highlights for soft atmospheric bloom */}
        <feColorMatrix
          in="baseDuotone"
          type="matrix"
          values="2.5 0 0 0 -1.2
                  0 2.5 0 0 -1.2
                  0 0 2.5 0 -0.8
                  0 0 0 1 0"
          result="highlights"
        />
        <feGaussianBlur in="highlights" stdDeviation="16" result="softBloom" />
        <feGaussianBlur in="highlights" stdDeviation="36" result="wideBloom" />

        {/* Screen bloom over duotone */}
        <feMerge result="duotoneWithBloom">
          <feMergeNode in="baseDuotone" />
          <feMergeNode in="softBloom" />
          <feMergeNode in="wideBloom" />
        </feMerge>
      </filter>

      {/* 3. Photographic Film Grain Overlay Texture */}
      <filter id={grainId} x="0%" y="0%" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.75"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 0.08 0"
          result="grain"
        />
      </filter>
    </>
  )
}

/**
 * Standalone SVG <defs> component.
 * Embeds the <filter> and gradient definitions into the DOM
 * so they can be dynamically referenced anywhere via CSS `filter: url(#id)` or SVG `fill: url(#id)`.
 */
export const BlueColorFilterDefs: React.FC<BlueColorFilterDefsProps> = ({
  id = BLUE_COLOR_FILTER_ID,
  palette,
  contrast = 1.25,
}) => {
  const topBloomId = `${id}-top-bloom`
  const flareLeftId = `${id}-flare-left`
  const flareRightId = `${id}-flare-right`

  // Reference-calibrated table values for true royal/cobalt blue duotone
  // Stops: [0: Deep Navy, 0.18: Sapphire, 0.38: Deep Cobalt, 0.58: Royal Blue, 0.78: Sky Blue, 0.92: Ice Haze, 1.0: White Bloom]
  const defaultRedValues = '0.005 0.020 0.060 0.180 0.500 0.820 1.000'
  const defaultGreenValues = '0.050 0.120 0.250 0.450 0.720 0.900 1.000'
  const defaultBlueValues = '0.450 0.700 0.920 1.000 1.000 1.000 1.000'

  const { tableR, tableG, tableB } = useMemo(() => {
    if (!palette) {
      return {
        tableR: defaultRedValues,
        tableG: defaultGreenValues,
        tableB: defaultBlueValues,
      }
    }

    const cShadow = hexToNormalizedRgb(palette.shadow || '#010d73')
    const cMidDark = hexToNormalizedRgb(palette.midDark || '#051fb3')
    const cDarkMid = hexToNormalizedRgb(palette.darkMid || '#0f40eb')
    const cMid = hexToNormalizedRgb(palette.midtone || '#2e73ff')
    const cBright = hexToNormalizedRgb(palette.bright || '#80b8ff')
    const cSoftHigh = hexToNormalizedRgb(palette.softHighlight || '#d1e6ff')
    const cHigh = hexToNormalizedRgb(palette.highlight || '#ffffff')

    return {
      tableR: [
        cShadow[0],
        cMidDark[0],
        cDarkMid[0],
        cMid[0],
        cBright[0],
        cSoftHigh[0],
        cHigh[0],
      ].join(' '),
      tableG: [
        cShadow[1],
        cMidDark[1],
        cDarkMid[1],
        cMid[1],
        cBright[1],
        cSoftHigh[1],
        cHigh[1],
      ].join(' '),
      tableB: [
        cShadow[2],
        cMidDark[2],
        cDarkMid[2],
        cMid[2],
        cBright[2],
        cSoftHigh[2],
        cHigh[2],
      ].join(' '),
    }
  }, [palette])

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <defs>
        {renderFilterElements(id, tableR, tableG, tableB, contrast)}

        {/* Top celestial apex glow cone */}
        <radialGradient id={topBloomId} cx="50%" cy="0%" r="65%" fx="50%" fy="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="18%" stopColor="#d5e8ff" stopOpacity="0.88" />
          <stop offset="40%" stopColor="#80b3ff" stopOpacity="0.62" />
          <stop offset="68%" stopColor="#256bf5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#02146e" stopOpacity="0" />
        </radialGradient>

        {/* Left atmospheric ambient flare */}
        <radialGradient id={flareLeftId} cx="20%" cy="66%" r="44%">
          <stop offset="0%" stopColor="#bed8ff" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#5595ff" stopOpacity="0.32" />
          <stop offset="70%" stopColor="#1a4fda" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#010c42" stopOpacity="0" />
        </radialGradient>

        {/* Right atmospheric ambient flare */}
        <radialGradient id={flareRightId} cx="86%" cy="30%" r="42%">
          <stop offset="0%" stopColor="#cce2ff" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#5b9aff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#010c42" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export interface BlueColorFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image to apply the duotone filter to.
   * Can be an imported asset URL, an image path, or empty to display ambient gradient background.
   * Example: `<BlueColorFilter img={Building} />`
   */
  img?: string

  /**
   * Image alt text for accessibility
   * @default 'Background with blue duotone filter'
   */
  alt?: string

  /**
   * Custom ID for the SVG filter element.
   * If omitted, a unique sanitized ID is automatically created.
   * Useful when referencing via CSS: `filter: url(#my-id)`
   */
  filterId?: string

  /**
   * Children nodes to render on top of the background (e.g. hero text, navigation, content)
   */
  children?: React.ReactNode

  /**
   * Whether to include the glowing atmospheric lighting layers (top celestial bloom, ambient flares).
   * Replicates the bright glowing sky and atmospheric lighting from the reference image.
   * @default true
   */
  atmosphericLight?: boolean

  /**
   * Multiplier for the atmospheric glowing light intensity (0 = disabled, 1 = normal, 2 = intense)
   * @default 1
   */
  glowIntensity?: number

  /**
   * Whether to use the integrated SVG optical bloom filter mode
   * @default false
   */
  useIntegratedGlowFilter?: boolean

  /**
   * Whether to include subtle photographic film grain texture
   * @default true
   */
  grain?: boolean

  /**
   * Duotone color stops customization
   */
  palette?: DuotonePalette

  /**
   * Contrast multiplier applied to the image (default: 1.25)
   */
  contrast?: number

  /**
   * Object fit behavior for the underlying image ('cover' | 'contain' | 'fill' | 'none' | 'scale-down')
   * @default 'cover'
   */
  objectFit?: React.CSSProperties['objectFit']

  /**
   * Object position for the underlying image (e.g. 'center', 'top center')
   * @default 'center'
   */
  objectPosition?: React.CSSProperties['objectPosition']

  /**
   * Additional CSS classes for the root container
   */
  className?: string

  /**
   * Additional styles for the root container
   */
  style?: React.CSSProperties

  /**
   * Additional CSS classes for the image element
   */
  imgClassName?: string

  /**
   * Additional styles for the image element
   */
  imgStyle?: React.CSSProperties

  /**
   * If true, only renders the SVG <defs> tag without the background container
   * @default false
   */
  defsOnly?: boolean
}

/**
 * BlueColorFilter Component
 *
 * Renders an SVG-based duotone and atmospheric glowing light background filter.
 * Replicates the deep royal blue duotone and bright ethereal sky bloom seen in the reference image.
 *
 * Usage:
 * ```tsx
 * import Building from '@/assets/images/img-building.webp'
 * import { BlueColorFilter } from '@/components/BlueColorFilter'
 *
 * // Basic usage as background
 * <BlueColorFilter img={Building} />
 *
 * // With children content layered on top
 * <BlueColorFilter img={Building} className="min-h-screen">
 *   <div className="relative z-10 flex items-center justify-center h-full">
 *     <h1 className="text-white text-5xl font-bold">Summit 2026</h1>
 *   </div>
 * </BlueColorFilter>
 *
 * // Reference the filter via CSS directly
 * // <img src={Building} style={{ filter: 'url(#blue-color-filter)' }} />
 * ```
 */
export const BlueColorFilter: React.FC<BlueColorFilterProps> = ({
  img,
  alt = 'Background with blue duotone filter',
  filterId = BLUE_COLOR_FILTER_ID,
  children,
  atmosphericLight = true,
  glowIntensity = 1,
  useIntegratedGlowFilter = false,
  grain = true,
  palette,
  contrast = 1.25,
  objectFit = 'cover',
  objectPosition = 'center',
  className = '',
  style = {},
  imgClassName = '',
  imgStyle = {},
  defsOnly = false,
  ...rest
}) => {
  const resolvedFilterId = filterId || BLUE_COLOR_FILTER_ID
  const activeFilterId = useIntegratedGlowFilter ? `${resolvedFilterId}-glow` : resolvedFilterId

  // IDs for gradient overlays and grain
  const topBloomId = `${resolvedFilterId}-top-bloom`
  const flareLeftId = `${resolvedFilterId}-flare-left`
  const flareRightId = `${resolvedFilterId}-flare-right`
  const grainId = `${resolvedFilterId}-grain`

  if (defsOnly) {
    return <BlueColorFilterDefs id={resolvedFilterId} palette={palette} contrast={contrast} />
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#010c3d',
        ...style,
      }}
      {...rest}
    >
      {/* 1. Underlying SVG Filter Definitions */}
      <BlueColorFilterDefs id={resolvedFilterId} palette={palette} contrast={contrast} />

      {/* 2. Responsive Image Layer with Duotone Filter */}
      {img && (
        <img
          src={img}
          alt={alt}
          className={`absolute inset-0 w-full h-full pointer-events-none select-none ${imgClassName}`}
          style={{
            objectFit,
            objectPosition,
            filter: `url(#${activeFilterId})`,
            WebkitFilter: `url(#${activeFilterId})`,
            ...imgStyle,
          }}
        />
      )}

      {/* 3. Atmospheric Lighting & Glowing Light Overlays */}
      {atmosphericLight && glowIntensity > 0 && (
        <>
          {/* Radial gradient flares inside an SVG layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ opacity: glowIntensity, mixBlendMode: 'screen' }}
          >
            {/* Top radiant celestial bloom - washes over apex of the building */}
            <rect width="100%" height="100%" fill={`url(#${topBloomId})`} />

            {/* Left ambient flare */}
            <rect width="100%" height="100%" fill={`url(#${flareLeftId})`} />

            {/* Right ambient flare */}
            <rect width="100%" height="100%" fill={`url(#${flareRightId})`} />
          </svg>

          {/* Ethereal top cone light dispersion */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 42% at 50% 0%, rgba(255, 255, 255, 0.45) 0%, rgba(140, 195, 255, 0.25) 45%, transparent 100%)',
              mixBlendMode: 'screen',
              opacity: Math.min(1.2, glowIntensity),
            }}
          />

          {/* Bottom shadow depth anchor to emphasize upward perspective */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(1, 10, 48, 0.72) 0%, rgba(1, 10, 48, 0) 50%)',
            }}
          />

          {/* Deep perimeter vignette (creates the dark border frame from the reference) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 120px rgba(1, 8, 38, 0.70)',
            }}
          />
        </>
      )}

      {/* 4. Subtle Film Grain Texture Overlay */}
      {grain && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ opacity: 0.32, mixBlendMode: 'overlay' }}
        >
          <rect width="100%" height="100%" filter={`url(#${grainId})`} />
        </svg>
      )}

      {/* 5. Children / Content Layer */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  )
}

export default BlueColorFilter
