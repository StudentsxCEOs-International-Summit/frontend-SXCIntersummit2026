import summitLogo from '@/assets/ic-icon-internasional.svg'
import blueKey from '@/assets/about/ic-blue-key.png'
import { CardLabel, ContainShape } from './AboutShared'

function SummitSection() {
  return (
    <section
      id="sxc-summit"
      aria-labelledby="sxc-summit-title"
      className="relative mx-auto mt-8 w-full lg:-mt-3 max-w-300 lg:max-w-[min(1400px,92vw)] px-4 sm:px-6"
    >
      <div className="relative pt-8 lg:pt-10">
        <div className="absolute top-0 right-0 z-10 w-[86%] sm:w-1/2 lg:top-7 lg:-right-[0.5%] lg:w-[31%]">
          <CardLabel side="left" className="w-full" textClassName="text-[13px] sm:text-base lg:text-lg">
            <span id="sxc-summit-title">SxC International Summit 2026</span>
          </CardLabel>
        </div>

        {/* Blue key at the bottom-left corner (desktop only) */}
        <img
          src={blueKey}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[26%] -left-[7%] z-20 hidden w-[22%] animate-key-blue select-none lg:block"
        />
        <div className="relative lg:aspect-[1199/260]">
          {/* Desktop: the Figma container outline, stretched to fit */}
          <div className="hidden lg:block">
            <ContainShape variant="left" />
          </div>
          {/* Mobile / tablet fallback card */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(190deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] lg:hidden"
          />

          <div className="relative flex flex-col-reverse items-center gap-6 px-6 pt-14 pb-8 sm:px-10 lg:h-full lg:flex-row lg:items-center lg:gap-[5%] lg:pt-8 lg:pr-[6%] lg:pb-4 lg:pl-[8%]">
            <p
              className="font-body text-xs leading-relaxed text-left text-[#1a2340] sm:text-sm lg:flex-1 lg:text-[length:clamp(11px,1.05vw,17px)] lg:leading-relaxed"
            >
              <strong className="font-bold text-[#0b3d91]">StudentsxCEOs International Summit 2026</strong> is a <strong className="font-bold text-[#0b3d91]">flagship program</strong> run by <strong className="font-bold text-[#0b3d91]">StudentsxCEOs Jakarta</strong>. We empower the young generation to become <strong className="font-bold text-[#0b3d91]">ethical innovators</strong> who confidently
              navigate uncertainty, seize emerging opportunities, and create <strong className="font-bold text-[#0b3d91]">sustainable impact</strong> in
              the digital era.
            </p>
            <div className="relative w-44 shrink-0 lg:w-[17%]">
              <img
                src={summitLogo}
                alt="SxC International Summit 2026 logo"
                className="relative aspect-[203/174] w-full object-contain drop-shadow-[0_6px_14px_rgba(2,98,244,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>    </section>
  )
}

export default SummitSection
