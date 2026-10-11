import containMainLeft from '@/assets/About/ic-containMainleft.svg'
import blueKey from '@/assets/About/ic-BlueKey.png'
import summitLogo from '@/assets/ic-iconinternasional.svg'
import { CardLabel, cardText } from './AboutShared'

function SummitSection() {
  return (
    <section
      id="sxc-summit"
      aria-labelledby="sxc-summit-title"
      className="relative mx-auto w-full max-w-300 px-4 sm:px-6"
    >
      <div className="relative pt-8 lg:pt-9">
        <CardLabel
          side="left"
          className="absolute -bottom-9 right-0 z-10 w-2/5 px-10"
          textClassName="text-base sm:text-lg lg:text-xl"
        >
          <span className='px-2' id="sxc-summit-title">SxC International Summit 2026</span>
        </CardLabel>

        <div className="relative lg:aspect-1202/344">
          {/* Desktop: exact Figma container shape */}
          <img
            src={containMainLeft}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full select-none lg:block"
          />
          {/* Mobile / tablet fallback card */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(190deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] lg:hidden"
          />

          <div className="relative flex flex-col-reverse items-center gap-6 px-6 pt-14 pb-8 sm:px-10 lg:absolute lg:inset-0 lg:flex-row lg:gap-[3%] lg:pt-[4%] lg:pr-[10%] lg:pb-[5%] lg:pl-[5%]">
            <p
              className={`font-body text-sm leading-relaxed text-justify sm:text-base lg:text-[0.9rem] xl:text-base ${cardText}`}
            >
              <strong className="font-semibold">StudentsxCEOs International Summit 2026</strong> is
              a flagship program run by StudentsxCEOs Jakarta. We empower the young generation to
              become ethical innovators through world-class competitions, conferences, and
              company visits. Bringing together students from Indonesia and across the globe, the
              Summit is where emerging ideas meet industry leaders to create sustainable impact in
              the digital era.
            </p>
            <div className="relative w-44 shrink-0 lg:w-[19%]">
              <img
                src={summitLogo}
                alt="SxC International Summit 2026 logo"
                className="relative aspect-[203/174] w-full object-contain drop-shadow-[0_6px_14px_rgba(2,98,244,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummitSection
