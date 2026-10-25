import { SectionTitle } from '@/components/landing/ui'
import { OutlinedText, glassCardEdge } from '@/components/about/AboutShared'
import certIcon from '@/assets/ic-certificate-yellow.svg'
import moneyIcon from '@/assets/ic-money-yellow.svg'
import teamIcon from '@/assets/ic-team-yellow.svg'
import industryIcon from '@/assets/ic-industry-yellow.svg'
import internationalIcon from '@/assets/ic-international-yellow.svg'
import dice from '@/assets/ic-dice.svg'
import blueDice from '@/assets/ic-blue-dice.svg'

interface BenefitItem {
  title: string
  icon: string
  /** Perspective tilt (deg): outer cards lean in toward the centre, like Our Values. */
  tilt: number
}

const benefits: BenefitItem[] = [
  { title: 'E-Certificate', icon: certIcon, tilt: 12 },
  { title: 'Prize Money', icon: moneyIcon, tilt: 0 },
  { title: 'Networking', icon: teamIcon, tilt: -12 },
  { title: 'Industries Exposure', icon: industryIcon, tilt: 10 },
  { title: 'International Exposure', icon: internationalIcon, tilt: -10 },
]

/** Same glass-card language as the Our Values cards on the About page. */
function BenefitCard({ item }: { item: BenefitItem }) {
  return (
    <article style={{ transform: `perspective(850px) rotateY(${item.tilt}deg)` }} className={`group flex min-h-[190px] w-full flex-col items-center justify-center gap-4 rounded-[14px] lg:aspect-[150/118] ${glassCardEdge} bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(196,220,255,0.62)_100%)] px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,40,130,0.25)] transition-all duration-300 hover:-translate-y-1 hover:brightness-105`}>
      <h3 className="font-heading text-sm font-semibold sm:text-base lg:text-lg">
        <OutlinedText stroke={3}>{item.title}</OutlinedText>
      </h3>
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl sm:h-24 sm:w-24 lg:h-28 lg:w-28 border border-white/40 bg-[linear-gradient(135deg,#3b82f6_0%,#1d4ed8_100%)] shadow-inner transition-transform duration-300 group-hover:scale-105">
        <img src={item.icon} alt="" aria-hidden="true" className="h-11 w-11 object-contain sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
      </div>
    </article>
  )
}

export function IbccBenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Benefits
      </SectionTitle>

      {/* 3 + 2 centred, on the same 1000px column as the other sections */}
      <ul className="relative mx-auto flex max-w-[900px] flex-wrap justify-center gap-5">
        {benefits.map((item) => (
          <li key={item.title} className="w-full sm:w-[calc((100%-2.5rem)/3)]">
            <BenefitCard item={item} />
          </li>
        ))}
      </ul>

      {/* Dice on the sides (desktop only) */}
      <img
        src={dice}
        alt=""
        aria-hidden="true"
        className="animate-float pointer-events-none absolute bottom-0 -left-6 hidden w-28 rotate-12 drop-shadow-xl select-none lg:block xl:w-36"
      />
      <img
        src={blueDice}
        alt=""
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute bottom-0 -right-6 hidden w-28 -rotate-12 drop-shadow-xl select-none lg:block xl:w-36"
      />
    </section>
  )
}

export default IbccBenefitsSection
