import { SectionTitle } from '@/components/landing/ui'
import certIcon from '@/assets/ic-certificate-yellow.svg'
import moneyIcon from '@/assets/ic-money-yellow.svg'
import teamIcon from '@/assets/ic-team-yellow.svg'
import industryIcon from '@/assets/ic-industry-yellow.svg'
import internationalIcon from '@/assets/ic-international-yellow.svg'
import dice from '@/assets/ic-dice.svg'
import blueDice from '@/assets/ic-bluedice.svg'

interface BenefitItem {
  title: string
  icon: string
  tiltClass: string
}

const benefitsRow1: BenefitItem[] = [
  {
    title: 'E-Certificate',
    icon: certIcon,
    tiltClass: '-rotate-2',
  },
  {
    title: 'Prize Money',
    icon: moneyIcon,
    tiltClass: 'rotate-0',
  },
  {
    title: 'Networking',
    icon: teamIcon,
    tiltClass: 'rotate-2',
  },
]

const benefitsRow2: BenefitItem[] = [
  {
    title: 'Industries Exposure',
    icon: industryIcon,
    tiltClass: 'rotate-1',
  },
  {
    title: 'International Exposure',
    icon: internationalIcon,
    tiltClass: '-rotate-1',
  },
]

function BenefitCard({ item }: { item: BenefitItem }) {
  return (
    <div
      className={`relative w-full max-w-[280px] sm:max-w-[300px] rounded-3xl bg-gradient-to-br from-white/90 to-transparent p-[3px] shadow-[0_12px_32px_rgb(10_63_184/0.35)] transition-all duration-300 hover:scale-105 hover:rotate-0 ${item.tiltClass}`}
    >
      <div className="bg-glass-blue rounded-[calc(1.5rem-3px)] p-6 sm:p-8 flex flex-col items-center justify-between text-center min-h-[220px] sm:min-h-[240px]">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white drop-shadow">
          {item.title}
        </h3>
        <div className="mt-4 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[linear-gradient(135deg,#3b82f6_0%,#1d4ed8_100%)] p-4 flex items-center justify-center shadow-inner border border-white/40">
          <img src={item.icon} alt={item.title} className="w-12 h-12 object-contain" />
        </div>
      </div>
    </div>
  )
}

export function IbccBenefitsSection() {
  return (
    <section
      id="benefits"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Benefits
      </SectionTitle>

      <div className="relative mt-12 flex flex-col items-center gap-6 sm:gap-8">
        {/* Row 1: 3 cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 w-full">
          {benefitsRow1.map((item) => (
            <BenefitCard key={item.title} item={item} />
          ))}
        </div>

        {/* Row 2: 2 cards centered */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 w-full">
          {benefitsRow2.map((item) => (
            <BenefitCard key={item.title} item={item} />
          ))}
        </div>

        {/* Floating dice decorations on the sides */}
        <img
          src={dice}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-8 sm:-left-16 w-36 sm:w-52 rotate-12 select-none drop-shadow-2xl hidden md:block"
        />
        <img
          src={blueDice}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-8 sm:-right-16 w-36 sm:w-52 -rotate-12 select-none drop-shadow-2xl hidden md:block"
        />
      </div>
    </section>
  )
}

export default IbccBenefitsSection
