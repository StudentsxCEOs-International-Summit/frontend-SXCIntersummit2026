import yellowChess from '@/assets/ic-yellowchess.svg'
import blueChess from '@/assets/ic-chess.svg'
import caseStudyBook from '@/assets/ic-book.svg'
import goldKey from '@/assets/ic-key.svg'
import dice from '@/assets/ic-dice.svg'
import star from '@/assets/ic-star.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'
import { ArrowIcon, GoldButton } from './ui'

function TabBanner({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      className={`bg-gold-gloss text-outline-blue inline-block -skew-x-[20deg] rounded-lg border-2 border-white px-8 py-2 font-heading text-2xl font-extrabold shadow-[0_6px_16px_rgb(244_163_0/0.4)] sm:text-[1.75rem] ${className}`}
    >
      <span className="inline-block skew-x-[20deg]">{children}</span>
    </div>
  )
}

const panel =
  'bg-glass-blue border-[3px] border-white/90 shadow-[0_12px_32px_rgb(10_63_184/0.35)] overflow-hidden'

const panelNoBorder =
  'bg-glass-blue shadow-[0_12px_32px_rgb(10_63_184/0.35)] overflow-hidden'

function AboutSection() {
  return (
    <section
      id="about"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      {/* ── Top row: Text card + Illustrations card ── */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="relative pt-7">
          <TabBanner className="absolute top-0 left-6 z-10 sm:left-10">Get to Know IBCC</TabBanner>
          {/* Gradient border wrapper */}
          <div className="relative bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-[3px] lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
            <div className={`${panelNoBorder} rounded-[calc(1.5rem-3px)] px-6 pt-14 pb-10 sm:px-12 lg:[clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]`}>
              <h3 className="font-heading text-xl font-bold text-orange-light">What is IBCC?</h3>
              <p className="mt-2 font-heading text-base leading-relaxed text-white sm:text-lg">
                <strong className="font-bold">
                  The International Business Case Competition (IBCC)
                </strong>{' '}
                is the core event of the International Summit where participants are challenged to
                solve real-world business problems through professional collaboration. Through this
                year&apos;s theme, we aim to harness the potential of growing technology to thrive on
                the modern age of business.
              </p>
              <h3 className="mt-7 font-heading text-xl font-bold text-orange-light">
                Who can Participate?
              </h3>
              <p className="mt-2 font-heading text-base leading-relaxed text-white sm:text-lg">
                IBCC is exclusively open to{' '}
                <strong className="font-bold">
                  undergraduate university students from all universities across Indonesia.
                </strong>
              </p>
              <GoldButton href="#competitions" className="mt-8 sm:min-w-[320px]">
                Join Now <ArrowIcon />
              </GoldButton>
            </div>
          </div>
        </div>

        {/* Right illustration card – clipped diagonally on the left */}
        <div className="relative hidden lg:block lg:mt-7">
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-[3px] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
            <div className={`w-full h-full ${panelNoBorder} relative min-h-[400px] rounded-[calc(1.5rem-3px)] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]`}>
              {/* Yellow chess pawn – large, center-left */}
              <img
                src={yellowChess}
                alt=""
                className="pointer-events-none absolute left-[18%] top-[10%] w-44 select-none drop-shadow-xl sm:w-52"
              />

              {/* Blue chess pawn – upper right, smaller */}
              <img
                src={blueChess}
                alt=""
                className="pointer-events-none absolute right-8 top-[8%] w-20 select-none drop-shadow-md sm:w-24"
              />

              {/* Case Study Book – bottom center-left */}
              <img
                src={caseStudyBook}
                alt=""
                className="pointer-events-none absolute bottom-[-8px] left-[15%] w-48 select-none drop-shadow-2xl sm:w-56"
              />

              {/* Golden Key – bottom right, slightly rotated */}
              <img
                src={goldKey}
                alt=""
                className="pointer-events-none absolute -bottom-4 right-0 w-32 rotate-6 select-none drop-shadow-xl sm:w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom row: Chess card + Stars card + Prize card ── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.7fr] lg:grid-cols-[1.1fr_0.75fr_1.9fr]">
        {/* Chess pieces card */}
        <div
          className={`${panel} relative hidden h-[220px] rounded-3xl lg:block`}
          aria-hidden="true"
        >
          {/* Blue chess – left side */}
          <img
            src={blueChess}
            alt=""
            className="pointer-events-none absolute bottom-2 left-6 w-28 select-none drop-shadow-lg"
          />
          {/* Yellow chess – center */}
          <img
            src={yellowChess}
            alt=""
            className="pointer-events-none absolute bottom-0 left-[35%] w-36 select-none drop-shadow-xl"
          />
          {/* Yellow star – upper right */}
          <img
            src={starYellowGlow}
            alt=""
            className="animate-float pointer-events-none absolute right-6 top-6 w-20 select-none"
          />
        </div>

        {/* Stars card – skewed */}
        <div
          className={`${panel} relative hidden h-[220px] -skew-x-[20deg] rounded-3xl sm:block`}
          aria-hidden="true"
        >
          <img
            src={starYellowGlow}
            alt=""
            className="pointer-events-none absolute top-4 left-4 w-14 skew-x-[20deg] select-none"
          />
          <img
            src={starYellowGlow}
            alt=""
            className="animate-float pointer-events-none absolute right-4 bottom-6 w-20 skew-x-[20deg] select-none"
          />
        </div>

        {/* Prize card */}
        <div className="relative pt-7 sm:col-span-2 lg:col-span-1">
          <TabBanner className="absolute top-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
            Total Prize Up To:
          </TabBanner>
          <div className="relative w-full h-[220px]">
            {/* Gradient border wrapper */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-[3px] lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
              <div
                className={`${panelNoBorder} flex w-full h-full items-center justify-center rounded-[calc(1.5rem-3px)] pt-8 lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]`}
              >
                <p className="text-outline-blue font-heading text-4xl font-extrabold sm:text-6xl">
                  Rp.20.000.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
