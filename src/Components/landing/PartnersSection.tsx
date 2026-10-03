import { SectionTitle } from './ui'
import adInLogo from '@/assets/media-partners/55-ADINS.svg'

// File names follow `<order>_<L|M|S>_<name>.<ext>`; the tier sets the logo size.
const logoModules = import.meta.glob<string>('@/assets/media-partners/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
})

type Tier = 'L' | 'M' | 'S'

const mediaPartners = Object.entries(logoModules)
  .map(([path, src]) => {
    const file = path.split('/').pop()!.replace(/\.(png|jpg|jpeg|svg)$/i, '')
    const parts = file.split('_')
    
    let order = 999
    let tier: Tier = 'S'
    let name = file

    if (!isNaN(Number(parts[0]))) {
      order = Number(parts[0])
      if (['L', 'M', 'S'].includes(parts[1])) {
        tier = parts[1] as Tier
        name = parts.slice(2).join(' ')
      } else {
        name = parts.slice(1).join(' ')
      }
    }

    return { src, order, tier, name }
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
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Case Collaborator</SectionTitle>
      {/* TODO: replace the wordmark with the AD-INS logo asset from Figma. */}
      <div className={`${panel} mt-12 flex items-center justify-center px-6 py-16 sm:py-20`}>
        <img src={adInLogo}/>
      </div>
    </section>
  )
}

export function MediaPartnerSection() {
  return (
    <section id="media-partner" className="w-full mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Media Partner</SectionTitle>
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
