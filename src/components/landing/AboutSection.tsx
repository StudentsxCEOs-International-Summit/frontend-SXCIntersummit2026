import yellowChess from '@/assets/ic-yellow-chess.svg'
import blueChess from '@/assets/ic-chess.svg'
import caseStudyBook from '@/assets/ic-book.svg'
import goldKey from '@/assets/ic-key.svg'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'
import { ArrowIcon, GoldButton } from './ui'

export function TabBanner({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      className={`bg-gold-gloss inline-block -skew-x-[20deg] rounded-lg border-2 border-white px-5 py-1.5 font-heading text-xl font-extrabold whitespace-nowrap italic shadow-[0_6px_16px_rgb(244_163_0/0.4)] sm:px-8 sm:py-2 sm:text-[1.75rem] sm:not-italic ${className}`}
    >
      <div className="relative inline-block skew-x-[20deg]">
        <span
          aria-hidden="true"
          className="absolute inset-0 px-3 select-none pointer-events-none sm:px-5"
          style={{
            backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke:
              '6px transparent' /* Scaled down from 10px for the smaller text size */,
            paintOrder: 'stroke fill',
            filter:
              'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
          }}
        >
          {children}
        </span>
        <span className="relative block px-3 text-white sm:px-5">{children}</span>
      </div>
    </div>
  )
}

export const panelNoBorder = 'bg-glass-blue shadow-[0_12px_32px_rgb(10_63_184/0.35)] overflow-hidden'

export interface AboutSectionProps {
  prizeText?: string
  joinHref?: string
}

function AboutSection({
  prizeText = 'Rp.13.000.000+',
  joinHref = '/ibcc',
}: AboutSectionProps = {}) {
  return (
    <section
      id="about"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      {/* ── Top row: Text card + Illustrations card ── */}
      <div className="grid gap-1 lg:grid-cols-[1.45fr_1fr]">
        <div className="relative pt-7">
          <TabBanner className="absolute top-0 left-6 z-10 sm:left-10">Get to Know IBCC</TabBanner>
          {/* Gradient border wrapper */}
          <div className="relative bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-1 lg:[clip-path:polygon(0_0,100%_0,88%_100%,25%_100%,15%_93%,0_93%)]">
            <div
              className={`${panelNoBorder} relative rounded-[calc(1.5rem-3px)] px-6 pt-8 pb-14 sm:px-10 lg:[clip-path:polygon(0_0,100%_0,88%_100%,25%_100%,15%_93%,0_93%)]`}
            >
              <h3 className="font-heading text-lg font-bold text-orange-light">What is IBCC?</h3>
              <p className="mt-1.5 font-heading text-sm leading-relaxed text-white sm:text-base">
                <strong className="font-bold">
                  The International Business Case Competition (IBCC)
                </strong>{' '}
                is an annual event by StudentsxCEOs International Summit where top undergraduate
                students tackle real-world business cases, develop innovative solutions, and present
                their ideas to industry experts. It&apos;s more than a competition. It&apos;s a
                chance to grow, network, and make a difference.
              </p>
              <h3 className="mt-5 font-heading text-lg font-bold text-orange-light">
                Who can Participate?
              </h3>
              <p className="mt-1.5 font-heading text-sm leading-relaxed text-white sm:text-base">
                IBCC is exclusively open to{' '}
                <strong className="font-bold">
                  undergraduate university students from all universities across Indonesia
                </strong>
                , and international students are welcome too.
              </p>
              {/* Mobile-only decorations (the illustration card is hidden below lg) */}
              <img
                src={yellowChess}
                alt=""
                className="animate-float pointer-events-none absolute -right-2 bottom-3 w-24 rotate-12 select-none drop-shadow-lg sm:w-28 lg:hidden"
              />
              <img
                src={goldKey}
                alt=""
                className="animate-float-slow pointer-events-none absolute right-[5.5rem] -bottom-3 w-16 rotate-[25deg] select-none drop-shadow-lg sm:right-32 sm:w-20 lg:hidden"
              />
              <img
                src={starYellowGlow}
                alt=""
                className="animate-float pointer-events-none absolute top-4 right-3 w-10 rotate-12 select-none lg:hidden"
              />
              <GoldButton href={joinHref} className="relative mt-5 sm:min-w-[240px]">
                Join Now <ArrowIcon />
              </GoldButton>
            </div>
          </div>
        </div>

        {/* Right illustration card – clipped diagonally on the left */}
        <div className="relative hidden lg:block lg:mt-7">
          {/* Background Layer (Clipped) */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-[3px] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
            <div className="w-full h-full bg-glass-blue shadow-[0_12px_32px_rgb(10_63_184/0.35)] relative rounded-[calc(1.5rem-3px)] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
          </div>

          {/* Content Layer (Unclipped) */}
          <div className="w-full h-full relative min-h-[300px]">
            {/* Yellow chess pawn – large, center-left */}
            <img
              src={yellowChess}
              alt=""
              className="pointer-events-none absolute left-[30%] top-[15%] w-36 select-none drop-shadow-xl sm:w-40 rotate-345"
            />

            {/* Blue chess pawn – upper right, smaller */}
            <img
              src={blueChess}
              alt=""
              className="pointer-events-none absolute right-8 top-[8%] w-16 select-none drop-shadow-md sm:w-20 rotate-25"
            />

            {/* Case Study Book – bottom center-left */}
            <img
              src={caseStudyBook}
              alt=""
              className="pointer-events-none absolute -bottom-2 left-[15%] w-40 select-none drop-shadow-2xl sm:w-64"
            />

            {/* Golden Key – bottom right, slightly rotated */}
            <img
              src={goldKey}
              alt=""
              className="pointer-events-none absolute -bottom-8 -right-24 w-28 rotate-25 select-none drop-shadow-xl sm:w-60 "
            />
          </div>
        </div>
      </div>

      {/* ── Bottom row: Chess card + Stars card + Prize card ── */}
      <div className="mt-5 grid items-end gap-4 sm:grid-cols-[1fr_0.4fr] lg:grid-cols-[1.2fr_0.5fr_2.05fr]">
        {/* Chess pieces card */}
        <div className="relative hidden h-[220px] lg:block" aria-hidden="true">
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-transparent p-[3px] lg:[clip-path:polygon(0_0,45%_0,55%_15%,100%_15%,85%_100%,0_100%)]">
            <div
              className={`${panelNoBorder} relative h-full w-full rounded-[calc(1.5rem-3px)] lg:[clip-path:polygon(0_0,45%_0,55%_15%,100%_15%,85%_100%,0_100%)]`}
            />
          </div>
          {/* Content Layer (Unclipped) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Blue chess – left side */}
            <img
              src={yellowChess}
              alt=""
              className="absolute rotate-345 bottom-2 left-6 top-1 w-25 select-none drop-shadow-lg"
            />
            {/* Yellow chess – center */}
            <img
              src={yellowChess}
              alt=""
              className="absolute rotate-10 bottom-0 left-[35%] w-36 select-none drop-shadow-xl"
            />
          </div>
        </div>

        {/* Stars card – skewed */}
        <div className="relative hidden h-[220px] -skew-x-[20deg] sm:block" aria-hidden="true">
          {/* Gradient border wrapper */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/90 to-transparent p-[3px]">
            <div
              className={`${panelNoBorder} relative h-full w-full rounded-[calc(0.75rem-3px)]`}
            />
          </div>
          {/* Content Layer (Unclipped) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <img
              src={starYellowGlow}
              alt=""
              className="absolute top-10 -left-10 w-18 rotate-345 select-none"
            />
            <img
              src={starYellowGlow}
              alt=""
              className="animate-float absolute right-4 bottom-6 w-20 rotate-15 select-none"
            />
          </div>
        </div>

        {/* Prize card */}
        <div className="relative pt-7 sm:col-span-2 lg:col-span-1">
          <TabBanner className="absolute top-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
            Total Prize Up To:
          </TabBanner>
          <div className="relative w-full h-[220px]">
            {/* Gradient border wrapper */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-3xl p-[3px] sm:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
              <div
                className={`${panelNoBorder} relative flex w-full h-full text-center items-center justify-center rounded-[calc(1.5rem-3px)] pt-8 sm:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]`}
              >
                <img
                  src={starYellowGlow}
                  alt=""
                  className="animate-float pointer-events-none absolute top-8 left-3 w-10 -rotate-12 select-none sm:hidden"
                />
                <img
                  src={starYellowGlow}
                  alt=""
                  className="animate-float-slow pointer-events-none absolute right-3 bottom-3 w-12 rotate-12 select-none sm:hidden"
                />
                <div className="relative inline-block pb-7 px-2">
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 font-heading text-3xl  font-extrabold sm:text-5xl select-none pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      WebkitTextStroke: '10px transparent',
                      paintOrder: 'stroke fill',
                      filter:
                        'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
                    }}
                  >
                    {prizeText}
                  </span>
                  <span className="relative block font-heading text-3xl font-extrabold sm:text-5xl text-white">
                    {prizeText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
