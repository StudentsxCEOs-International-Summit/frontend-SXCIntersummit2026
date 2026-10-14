import containMainRight from '@/assets/about/ic-contain-mainright.svg'
import jakartaLogo from '@/assets/ic-jakarta-chapter.svg'
import { CardLabel, cardText } from './AboutShared'

function JakartaSection() {
  return (
    <section
      id="sxc-jakarta"
      aria-labelledby="sxc-jakarta-title"
      className="relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >


      <div className="relative pt-8 lg:pt-9">
        <CardLabel
          side="right"
          className="absolute -bottom-5 z-10 w-1/3"
          textClassName="text-base sm:text-lg lg:text-xl"
        >
          <span className='' id="sxc-jakarta-title">StudentsxCEOs Jakarta</span>
        </CardLabel>

        <div className="relative lg:aspect-[1199/356]">
          {/* Desktop: exact Figma container shape */}
          <img
            src={containMainRight}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full select-none lg:block"
          />
          {/* Mobile / tablet: same colours, simple rounded card so text can flow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(170deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] lg:hidden"
          />

          <div className="relative flex flex-col items-center gap-6 px-6  lg:absolute lg:inset-0 lg:flex-row lg:gap-[3%] ">
            <div className="relative w-52 shrink-0 lg:w-[23%]">
              <img
                src={jakartaLogo}
                alt="StudentsxCEOs Jakarta logo"
                className="relative aspect-[296/148] w-full object-contain"
              />
            </div>
            <p
              className={`px-15 font-body text-sm leading-relaxed text-justify sm:text-base lg:text-[0.9rem] xl:text-base ${cardText}`}
            >
              Founded in 2010, <strong className="font-semibold">StudentsxCEOs Jakarta</strong> is a
              non-profit, student-run organization that bridges the gap between students and the
              professional world. We connect young talents with CEOs, business leaders, and
              industry experts through mentoring, case-based learning, and high-impact events.
              Over the past decade, we have grown into one of Indonesia&apos;s largest student
              business communities, with more than 100 active members every year and thousands of
              alumni who now lead across corporate, start-up, and public sectors &mdash; all driven
              by our commitment to developing ethical, innovative future leaders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JakartaSection
