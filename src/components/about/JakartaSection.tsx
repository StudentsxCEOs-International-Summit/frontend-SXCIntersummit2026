import jakartaLogo from '@/assets/ic-jakarta-chapter.svg'
import goldKey from '@/assets/ic-key.svg'
import { CardLabel, ContainShape } from './AboutShared'

function JakartaSection() {
  return (
    <section
      id="sxc-jakarta"
      aria-labelledby="sxc-jakarta-title"
      className="relative mx-auto w-full max-w-[1200px] lg:max-w-[min(1400px,92vw)] scroll-mt-28 px-4 sm:px-6"
    >


      <div className="relative pt-8 lg:pt-10">
        <div className="absolute top-0 left-0 z-10 w-[64%] sm:w-1/3 lg:left-[1%] lg:w-[28%]">
          <CardLabel side="right" className="w-full" textClassName="text-[13px] sm:text-base lg:text-lg">
            <span id="sxc-jakarta-title">StudentsxCEOs Jakarta</span>
          </CardLabel>
        </div>

        {/* Gold key hanging off the right edge of the card (desktop only) */}
        <img
          src={goldKey}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -top-[4%] -right-[8%] z-20 hidden w-[17%] rotate-[30deg] animate-key-gold select-none lg:block"
        />
        <div className="relative lg:aspect-[1202/270]">
          {/* Desktop: the Figma container outline, stretched to fit */}
          <div className="hidden lg:block">
            <ContainShape variant="right" />
          </div>
          {/* Mobile / tablet: same colours, simple rounded card so text can flow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(170deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] lg:hidden"
          />

          <div className="relative flex flex-col items-center gap-6 px-6 py-8 lg:h-full lg:flex-row lg:items-center lg:gap-[5%] lg:px-[4%] lg:pt-4 lg:pb-8">
            <div className="relative w-52 shrink-0 lg:w-[24%]">
              <img
                src={jakartaLogo}
                alt="StudentsxCEOs Jakarta logo"
                className="relative aspect-[296/148] w-full object-contain"
              />
            </div>
            <p
              className="font-body text-xs leading-relaxed text-left text-[#1a2340] sm:text-sm lg:flex-1 lg:pr-[6%] lg:text-[length:clamp(11px,1.05vw,17px)] lg:leading-relaxed"
            >
              Founded in 2010, <strong className="font-bold text-[#0b3d91]">StudentsxCEOs Jakarta</strong> is a <strong className="font-bold text-[#0b3d91]">youth-led, student-run platform</strong> that
              accelerates <strong className="font-bold text-[#0b3d91]">leadership development</strong> for future business leaders in Indonesia. With <strong className="font-bold text-[#0b3d91]">four major chapters</strong>, <strong className="font-bold text-[#0b3d91]">over 150 core members</strong>, <strong className="font-bold text-[#0b3d91]">more than 1,000 top students from 30+ universities</strong>, and <strong className="font-bold text-[#0b3d91]">100+ corporate partners</strong>, we bridge student leaders with industry
              through internships, CEO meetings, summits, and collaboration programs. We cultivate
              <strong className="font-bold text-[#0b3d91]">real-world leadership experience</strong> by simulating corporate structures and
              responsibilities within our internal operations.
            </p>
          </div>
        </div>
      </div>    </section>
  )
}

export default JakartaSection
