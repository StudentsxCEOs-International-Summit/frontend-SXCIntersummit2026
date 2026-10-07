import containMainLeft from '@/assets/About/ic-containMainLeft.svg'
import blueKey from '@/assets/About/ic-BlueKey.png'
import goldKey from '@/assets/ic-key.svg'
import jakartaLogo from '@/assets/ic-jakartaChapter.svg'
import { CardLabel, cardText } from './AboutShared'

function JakartaSection() {
  return (
    <section
      id="sxc-jakarta"
      aria-labelledby="sxc-jakarta-title"
      className="relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      {/* Gold key hanging over the top-right corner of the card */}
      <img
        src={goldKey}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-4 z-20 hidden w-40 rotate-[28deg] drop-shadow-xl select-none md:block lg:-right-16 lg:w-56"
      />

      <div className="relative pt-8 lg:pt-9">
        <CardLabel
          side="left"
          className="absolute top-0 left-[2%] z-10 w-[78%] sm:w-[46%] lg:w-[27%]"
          textClassName="text-base sm:text-lg lg:text-xl"
        >
          <span id="sxc-jakarta-title">StudentsxCEOs Jakarta</span>
        </CardLabel>

        <div className="relative lg:aspect-[1199/356]">
          {/* Desktop: exact Figma container shape */}
          <img
            src={containMainLeft}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full select-none lg:block"
          />
          {/* Mobile / tablet: same colours, simple rounded card so text can flow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl border-[3px] border-white/90 bg-[linear-gradient(170deg,#ffffff_0%,#8BB9F4_100%)] shadow-[-2px_5px_3px_rgba(0,0,0,0.25)] lg:hidden"
          />

          <div className="relative flex flex-col items-center gap-6 px-6 pt-14 pb-8 sm:px-10 lg:absolute lg:inset-0 lg:flex-row lg:gap-[3%] lg:pt-[4.5%] lg:pr-[4%] lg:pb-[2.5%] lg:pl-[7.5%]">
            <div className="relative w-52 shrink-0 lg:w-[23%]">
              <img
                src={blueKey}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -left-12 w-28 -rotate-12 opacity-60 select-none lg:-bottom-[45%] lg:-left-[30%] lg:w-[60%]"
              />
              <img
                src={jakartaLogo}
                alt="StudentsxCEOs Jakarta logo"
                className="relative aspect-[296/148] w-full object-contain"
              />
            </div>
            <p
              className={`font-body text-sm leading-relaxed text-justify sm:text-base lg:text-[0.9rem] xl:text-base ${cardText}`}
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
