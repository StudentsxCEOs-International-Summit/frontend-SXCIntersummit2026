import { SectionTitle } from './ui'

// File names follow `<order>-<L|M|S>-<name>.webp`; the tier sets the logo size.
const logoModules = import.meta.glob<string>('@/assets/media-partners/*.webp', {
  eager: true,
  import: 'default',
})

type Tier = 'L' | 'M' | 'S'

const mediaPartners = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path.split('/').pop()!.replace('.webp', '')
    const [order, tier, ...name] = file.split('-')
    return { src, order: Number(order), tier: tier as Tier, name: name.join(' ') }
  })
  .sort((a, b) => a.order - b.order)

const tierHeight: Record<Tier, string> = {
  L: 'h-16 sm:h-20',
  M: 'h-12 sm:h-14',
  S: 'h-9 sm:h-11',
}

const panel =
  'rounded-[48px] border-2 border-white/70 bg-[linear-gradient(135deg,#c8dafd_0%,#a3c1fb_45%,#8fb3fa_100%)] shadow-[0_12px_32px_rgb(10_63_184/0.3)]'

export function CaseCollaboratorSection() {
  return (
    <section id="case-collaborator" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle>Case Collaborator</SectionTitle>
      {/* TODO: replace the wordmark with the AD-INS logo asset from Figma. */}
      <div className={`${panel} mt-12 flex items-center justify-center px-6 py-16 sm:py-20`}>
        <p className="font-heading text-5xl font-extrabold tracking-[0.15em] text-ds-black sm:text-7xl">
          <span className="text-[#d32f2f]">A</span>D·INS
        </p>
      </div>
    </section>
  )
}

export function MediaPartnerSection() {
  return (
    <section id="media-partner" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle>Media Partner</SectionTitle>
      <div className={`${panel} mt-12 flex flex-col gap-6 px-6 py-12 sm:px-12`}>
        {(['L', 'M', 'S'] as const).map((tier) => (
          <ul key={tier} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {mediaPartners
              .filter((p) => p.tier === tier)
              .map((p) => (
                <li key={p.src}>
                  <img
                    src={p.src}
                    alt={p.name}
                    title={p.name}
                    loading="lazy"
                    decoding="async"
                    className={`${tierHeight[tier]} w-auto max-w-[180px] object-contain`}
                  />
                </li>
              ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
