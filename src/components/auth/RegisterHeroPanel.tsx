import logo from '@/assets/ic-iconinternasional.svg'
import blueStarIcon from '@/assets/ic-bluestar.svg'
import yellowStarIcon from '@/assets/ic-star.svg'
import { PanelBackground } from '@/components/auth/decorative'
import { Dot } from '@/components/ui'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export interface RegisterHeroPanelProps {
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
}

export function RegisterHeroPanel({
  showBackButton = true,
  backHref = '/',
  backLabel = 'Back to Home',
}: RegisterHeroPanelProps = {}) {
  return (
    <div className="relative hidden h-full w-1/2 overflow-hidden lg:block">
      <PanelBackground />

      <img
        src={yellowStarIcon}
        alt="Decorative yellow star"
        aria-hidden="true"
        className="pointer-events-none absolute right-[30%] top-[10%] h-20 w-20 rotate-[13.55deg] xl:h-28 xl:w-28"
      />
      <img
        src={blueStarIcon}
        alt="Decorative blue star"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[25%] left-[3.5%] h-12 w-12 rotate-[13.55deg] xl:h-16 xl:w-16"
      />
      <img
        src={yellowStarIcon}
        alt="Decorative yellow star"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[25%] h-12 w-12 rotate-[13.55deg] xl:h-16 xl:w-16"
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-6 lg:px-16 xl:px-28">
        <div>
          {showBackButton && (
            <div className="mb-4">
              <Link
                to={backHref}
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-95 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>{backLabel}</span>
              </Link>
            </div>
          )}
          <img
            src={logo}
            alt="StudentsxCEOs"
            className="mb-4 h-20 w-20 lg:h-28 lg:w-28 xl:h-36 xl:w-36"
          />
          <h1 className="font-heading font-bold text-ds-white">
            <span className="text-2xl lg:text-3xl xl:text-[46px]">StudentsxCEOs</span>
            <br />
            <span className="text-lg lg:text-xl xl:text-[32px]">International Summit</span>
          </h1>
          <p className="mt-1 mb-3 font-heading text-4xl font-extrabold text-brand-gold lg:text-5xl xl:text-[72px]">
            2026
          </p>
          <p className="mb-8 flex items-center gap-3 text-sm font-extralight tracking-[0.20em] text-ds-white lg:text-base xl:gap-4 xl:text-[22px]">
            <span>Connect</span>
            <Dot size={8} />
            <span>Learn</span>
            <Dot size={8} />
            <span>Grow</span>
          </p>

          <div className="mt-8 max-w-sm rounded-[14px] border border-white/[0.12] bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(63,132,211,0.12)_50%,rgba(255,255,255,0.12)_100%)] p-4 shadow-ds-lg lg:mt-12 xl:mt-16">
            <span className="mb-3 block h-3 w-16 rounded-[4px] bg-brand-gold" />
            <h3 className="text-lg font-semibold leading-[1.4] tracking-[0.04em] text-ds-white lg:text-[22px] lg:leading-[32px]">
              International Summit 2026
            </h3>
            <p className="mt-1 text-sm font-light leading-[1.3] tracking-[0.03em] text-ds-white lg:text-[16px] lg:leading-[18px]">
              Connect with future leaders
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
