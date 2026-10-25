import type { CSSProperties } from 'react'
import { SectionTitle } from './ui'
import adInLogo from '@/assets/media-partners/55-adins.svg'

// File names follow `<order>-<tier>-<name>.<ext>`; the tier sets the logo size.
const logoModules = import.meta.glob<string>('@/assets/media-partners/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
})

type Tier = 'L' | 'M' | 'S'

const mediaPartners = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path.split('/').pop()!.replace(/\.(png|jpg|jpeg|webp|svg)$/i, '')
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

export function CaseCollaboratorSection() {
  return (
    <section id="case-collaborator" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Case Collaborator</SectionTitle>
      {/* TODO: replace the wordmark with the AD-INS logo asset from Figma. */}
      <div className={`${panel} mt-8 flex items-center justify-center px-6 py-8 sm:py-10`}>
        <img src={adInLogo} alt="AD-INS" className="h-10 w-auto max-w-full object-contain sm:h-14" />
      </div>
    </section>
  )
}

export function MediaPartnerSection() {
  return (
    <section id="media-partner" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Media Partner</SectionTitle>
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
                  <li key={`${copy}-${p.src}`} className="shrink-0 px-5 sm:px-7" aria-hidden={copy === 1 || undefined}>
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
