import logo from '@/assets/ic-iconinternasional.svg'
import blueStarIcon from '@/assets/ic-bluestar.svg'
import yellowStarIcon from '@/assets/ic-star.svg'
import { PanelBackground } from '@/components/register/decorative'
import { Dot } from '@/components/ui'

export function RegisterHeroPanel() {
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

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-8 lg:px-16 xl:px-28">
        <div>
          <img
            src={logo}
            alt="StudentsxCEOs"
            className="mb-6 h-24 w-24 lg:h-32 lg:w-32 xl:h-42 xl:w-42"
          />
          <h1 className="font-heading font-bold text-ds-white">
            <span className="text-2xl lg:text-3xl xl:text-[50px]">StudentsxCEOs</span>
            <br />
            <span className="text-lg lg:text-xl xl:text-[35px]">International Summit</span>
          </h1>
          <p className="mt-2 mb-4 font-heading text-4xl font-extrabold text-brand-gold lg:text-5xl xl:text-[80px]">
            2026
          </p>
          <p className="mb-10 flex items-center gap-3 text-sm font-extralight tracking-[0.20em] text-ds-white lg:text-base xl:gap-4 xl:text-[24px]">
            <span>Connect</span>
            <Dot size={8} />
            <span>Learn</span>
           <Dot size={8} />
            <span>Grow</span>
          </p>

          <div className="mt-14 max-w-sm rounded-[14px] border border-white/[0.12] bg-[linear-gradient(90deg,rgba(255,255,255,0.12)_0%,rgba(63,132,211,0.12)_50%,rgba(255,255,255,0.12)_100%)] p-4 shadow-ds-lg lg:mt-20 xl:mt-24">
            <span className="mb-3 block h-3 w-16 rounded-[4px] bg-brand-gold" />
            <h3 className="text-lg font-semibold leading-[1.4] tracking-[0.04em] text-ds-white lg:text-[24px] lg:leading-[35px]">
              International Summit 2026
            </h3>
            <p className="mt-1 text-sm font-light leading-[1.3] tracking-[0.03em] text-ds-white lg:text-[18px] lg:leading-[18px]">
              Connect with future leaders
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
