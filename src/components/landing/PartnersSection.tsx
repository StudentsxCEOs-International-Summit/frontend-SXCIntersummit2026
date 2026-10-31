import type { CSSProperties } from 'react'
import { SectionTitle } from './ui'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'

// File names follow `<order>-<tier>-<name>.<ext>`; the tier sets the logo size.
const logoModules = import.meta.glob<string>('@/assets/media-partners/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

type Tier = 'L' | 'M' | 'S'

// Sponsor logos follow `<order>-<size>-<name>.<ext>` (size xl or l, l when left out); drop a file into
// assets/sponsors to add one. The size tier makes the wide wordmarks (Cakap, Sompo) stand out a little more.
const sponsorModules = import.meta.glob<string>('@/assets/sponsors/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

const sponsors = Object.entries(sponsorModules)
  .map(([path, src]) => {
    const file = path
      .split('/')
      .pop()!
      .replace(/\.(png|jpg|jpeg|webp|svg)$/i, '')
    const match = file.match(/^(\d+)-(?:(xl|l)-)?(.+)$/i)
    const order = match ? Number(match[1]) : 999
    const name = (match?.[3] ?? file)
      .replaceAll('-', ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase())

    const size: 'xl' | 'l' = match?.[2]?.toLowerCase() === 'xl' ? 'xl' : 'l'

    return { src, order, name, size }
  })
  .sort((a, b) => a.order - b.order)

// The XL sponsors sit together on the top row and the L ones below, so the two sizes never mix in a row.
const sponsorGroups = (['xl', 'l'] as const)
  .map((size) => sponsors.filter((sponsor) => sponsor.size === size))
  .filter((group) => group.length > 0)

// XL for Cakap and Sompo, L for the rest. On desktop the white tile grows with the tier too, so an XL logo
// really looks bigger instead of just sitting in the same tile; phones show bare logos, sized by the logo.
const sponsorLogoSize: Record<'xl' | 'l', string> = {
  xl: 'max-h-14 max-w-full sm:max-h-20 sm:max-w-[84%]',
  l: 'max-h-9 max-w-[90%] sm:max-h-12 sm:max-w-[66%]',
}

const sponsorTileSize: Record<'xl' | 'l', string> = {
  xl: 'h-14 sm:h-36 sm:w-72',
  l: 'h-12 sm:h-28 sm:w-48',
}

// Phones: two XL logos share the top row (half the width each), the L logos sit three to a row below.
const sponsorItemWidth: Record<'xl' | 'l', string> = {
  xl: 'w-[calc((100%-0.75rem)/2)]',
  l: 'w-[calc((100%-1.5rem)/3)]',
}

const mediaPartners = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path
      .split('/')
      .pop()!
      .replace(/\.(png|jpg|jpeg|webp|svg)$/i, '')
    const match = file.match(/^(\d+)-(?:(l|m|s)-)?(.+)$/i)
    const order = match ? Number(match[1]) : 999
    const tier: Tier = match?.[2] ? (match[2].toUpperCase() as Tier) : 'S'
    const name = (match?.[3] ?? file)
      .replaceAll('-', ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase())

    return { src, order, tier, name }
  })
  .sort((a, b) => a.order - b.order)

const tierHeight: Record<Tier, string> = {
  L: 'h-12 sm:h-14',
  M: 'h-10 sm:h-12',
  S: 'h-8 sm:h-10',
}

// Logos are dealt round-robin into rows so every row mixes sizes evenly.
const MARQUEE_ROWS = 4
const marqueeRows = Array.from({ length: MARQUEE_ROWS }, (_, row) =>
  mediaPartners.filter((_, index) => index % MARQUEE_ROWS === row),
)

const panel =
  'rounded-[48px] border-2 border-white/70 bg-[linear-gradient(135deg,#c8dafd_0%,#a3c1fb_45%,#8fb3fa_100%)] shadow-[0_12px_32px_rgb(10_63_184/0.3)]'

/**
 * Sponsor logos on white tiles. Hovering (or tabbing to) a tile lifts it and slides the sponsor's
 * name up from the bottom, so the logos stay clean while the name is one hover away.
 */
export function SponsorSection() {
  return (
    <section id="sponsor" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Sponsor
      </SectionTitle>
      <div className={`${panel} mt-8 px-4 py-6 sm:px-10 sm:py-10`}>
        {/* Phones: bare logos (no white tiles), XL on the top row and L below, so the panel stays short. From sm up: tiles with the name on hover. */}
        <div className="flex flex-col gap-y-5 sm:gap-y-6">
          {sponsorGroups.map((group) => (
            <ul
              key={group[0].size}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-5 sm:gap-6"
            >
              {group.map((sponsor) => (
                <li key={sponsor.src} className={`${sponsorItemWidth[sponsor.size]} sm:w-auto`}>
                  <div
                    tabIndex={0}
                    aria-label={sponsor.name}
                    className={`group relative flex w-full cursor-default items-center justify-center focus-visible:ring-4 focus-visible:ring-[#0262F4]/60 focus-visible:outline-none sm:overflow-hidden sm:rounded-2xl sm:border-2 sm:border-white sm:bg-white sm:shadow-[0_6px_18px_rgb(10_63_184/0.22)] sm:transition-all sm:duration-300 sm:ease-out sm:hover:-translate-y-1.5 sm:hover:shadow-[0_16px_32px_rgb(10_63_184/0.38)] sm:focus-visible:-translate-y-1.5 ${sponsorTileSize[sponsor.size]}`}
                  >
                    <img
                      src={sponsor.src}
                      alt={sponsor.name}
                      loading="lazy"
                      decoding="async"
                      className={`w-auto object-contain transition-transform duration-300 ease-out sm:group-hover:-translate-y-2.5 sm:group-hover:scale-105 sm:group-focus-visible:-translate-y-2.5 sm:group-focus-visible:scale-105 ${sponsorLogoSize[sponsor.size]}`}
                    />
                    <span
                      aria-hidden="true"
                      className="font-heading absolute inset-x-0 bottom-0 hidden translate-y-[calc(100%+3px)] border-t-2 border-[#f4a300] bg-[linear-gradient(100deg,#003F9E_0%,#0262F4_100%)] px-2 py-1.5 text-center text-xs font-bold tracking-wide text-white transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0 sm:block sm:text-sm"
                    >
                      {sponsor.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

/** No case collaborator has been confirmed yet, so the panel teases the reveal instead. */
export function CaseCollaboratorSection() {
  return (
    <section id="case-collaborator" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Case Collaborator
      </SectionTitle>
      <div className={`${panel} relative mt-8 overflow-hidden px-6 py-7 text-center sm:py-9`}>
        <img
          src={starYellowGlow}
          alt=""
          aria-hidden="true"
          className="animate-float pointer-events-none absolute top-2 left-4 w-10 -rotate-12 select-none sm:top-4 sm:left-12 sm:w-16"
        />
        <img
          src={starYellowGlow}
          alt=""
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute right-4 bottom-2 w-11 rotate-12 select-none sm:right-12 sm:bottom-4 sm:w-18"
        />
        <div className="relative mx-auto flex max-w-lg flex-col items-center gap-2">
          <span className="rounded-full border-2 border-white/90 bg-white/40 px-4 py-1 font-heading text-xs font-bold tracking-[0.18em] text-[#0b4fd1] uppercase">
            Coming Soon
          </span>
          <p className="font-heading bg-[linear-gradient(100deg,#003F9E_0%,#0262F4_70%,#3E88F5_100%)] bg-clip-text text-3xl leading-tight font-extrabold text-transparent italic sm:text-5xl">
            To Be Announced
          </p>
          <p className="font-body text-sm text-[#0b3d91] sm:text-base">
            Our case collaborator is on the way. Stay tuned for the reveal!
          </p>
        </div>
      </div>
    </section>
  )
}

export function MediaPartnerSection() {
  return (
    <section id="media-partner" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Media Partner
      </SectionTitle>
      <div className={`${panel} mt-12 flex flex-col gap-5 overflow-hidden py-10 sm:py-12`}>
        {marqueeRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="marquee [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
          >
            <ul
              className={`flex w-max items-center ${rowIndex % 2 ? 'animate-marquee-reverse' : 'animate-marquee'}`}
              style={{ '--marquee-duration': `${row.length * 3.5}s` } as CSSProperties}
            >
              {/* The list is rendered twice so the -50% loop lands seamlessly. */}
              {[0, 1].map((copy) =>
                row.map((p) => (
                  <li
                    key={`${copy}-${p.src}`}
                    className="shrink-0 px-5 sm:px-7"
                    aria-hidden={copy === 1 || undefined}
                  >
                    <img
                      src={p.src}
                      alt={copy === 0 ? p.name : ''}
                      title={p.name}
                      loading="lazy"
                      decoding="async"
                      className={`${tierHeight[p.tier]} w-auto max-w-[160px] object-contain`}
                    />
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
