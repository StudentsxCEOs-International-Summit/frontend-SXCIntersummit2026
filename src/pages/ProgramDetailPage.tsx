import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import { BlueColorFilterDefs } from '@/components'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'
import yellowChess from '@/assets/ic-yellow-chess.svg'
import blueChess from '@/assets/ic-chess.svg'
import goldKey from '@/assets/ic-key.svg'
import Footer from '@/components/landing/Footer'
import { AboutBackground, BackgroundSection } from '@/components/landing/Backgrounds'
import { TabBanner, panelNoBorder } from '@/components/landing/AboutSection'
import { ArrowIcon, ChoiceDialog, GoldButton } from '@/components/landing/ui'
import NotFoundPage from '@/pages/NotFoundPage'
import { findProgram, type Program, type ProgramCategory } from '@/data/programs'

const CATEGORY_LABEL: Record<ProgramCategory, string> = {
  competition: 'Competition',
  event: 'Event',
}

const heroTextFill = {
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '10px transparent',
  paintOrder: 'stroke fill',
  filter:
    'drop-shadow(0 0 12px rgba(2, 98, 244, 0.5)) drop-shadow(0 4px 10px rgba(0, 63, 158, 0.6))',
} as const

/** Renders text where the important parts are wrapped in **double asterisks** as bold. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('**').map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-extrabold">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

/** "Read More": the same link as the card on the home page, a picker when several, or a short note. */
function ReadMore({ program, className = '' }: { program: Program; className?: string }) {
  const [pickerOpen, setPickerOpen] = useState(false)

  if (program.readMoreHref) {
    return (
      <GoldButton href={program.readMoreHref} className={className}>
        Read More <ArrowIcon />
      </GoldButton>
    )
  }

  if (program.readMoreChoices) {
    return (
      <>
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className={`bg-gold-gloss text-outline-sm font-heading text-body-base inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2.5 font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95 ${className}`}
        >
          Read More <ArrowIcon />
        </button>
        {pickerOpen && (
          <ChoiceDialog
            title={program.title}
            choices={program.readMoreChoices}
            onClose={() => setPickerOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <p
      className={`font-heading inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/20 px-6 py-2 text-sm font-semibold text-white ${className}`}
    >
      More details will be announced soon.
    </p>
  )
}

/**
 * One page per competition / event, built like the IBCC page: the same hero, the same "Get to Know"
 * panel and illustration card. Reached from the Competition and Events menus
 * (/competition/:slug, /events/:slug); "Read More" goes to the link the home page card uses.
 */
function ProgramDetailPage({ category }: { category: ProgramCategory }) {
  const { slug } = useParams()
  const program = findProgram(category, slug)
  usePageTitle(program ? `${program.title} | SxC International Summit 2026` : 'Page not found')

  if (!program) return <NotFoundPage />

  return (
    <div className="bg-landing relative overflow-hidden">
      <BlueColorFilterDefs />

      {/* Hero – same size, backdrop and title treatment as the IBCC hero */}
      <section className="relative flex min-h-[88svh] items-center justify-center px-4 pt-32 pb-24 sm:min-h-screen sm:pt-52 sm:pb-32">
        <img
          src={building}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />

        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway pointer-events-none absolute top-16 -left-12 w-44 rotate-225 sm:-top-4 sm:-left-28 sm:w-96" />
        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway-slow pointer-events-none absolute top-[78%] -right-12 w-40 rotate-45 sm:top-[45%] sm:-right-24 sm:w-96" />
        <img src={starGlow} alt="" aria-hidden="true" className="animate-twinkle pointer-events-none absolute -bottom-6 -left-10 w-44 -rotate-12 sm:-bottom-10 sm:-left-24 sm:w-80" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="flex flex-col items-center justify-center leading-tight select-none">
            <div className="relative inline-block">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 px-5 text-3xl font-bold tracking-tight select-none md:text-6xl lg:text-7xl"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 110%)',
                  ...heroTextFill,
                }}
              >
                {CATEGORY_LABEL[category]}
              </span>
              <span className="relative block px-5 text-3xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                {CATEGORY_LABEL[category]}
              </span>
            </div>

            <div className="relative mt-1 inline-block sm:mt-2">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 px-5 text-3xl font-extrabold tracking-tight italic select-none md:text-6xl lg:text-7xl"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #003F9E 0%, #0262F4 65%, #FFFFFF 120%)',
                  ...heroTextFill,
                }}
              >
                {program.title}
              </span>
              <span className="relative block px-5 text-3xl font-extrabold tracking-tight text-white italic md:text-6xl lg:text-7xl">
                {program.title}
              </span>
            </div>
          </h1>

          <p className="font-heading mt-6 text-sm font-semibold text-white sm:text-base">
            SxC International Summit 2026 Series
          </p>
        </div>
      </section>

      {/* Content band – the IBCC "Get to Know" panel and illustration card */}
      <div className="relative flex flex-col pt-8 sm:pt-16">
        <BackgroundSection background={<AboutBackground />} className="sm:min-h-0">
          <section className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6" aria-labelledby="program-about">
            <div className="grid gap-1 lg:grid-cols-[1.45fr_1fr]">
              <div className="relative pt-7">
                <TabBanner className="absolute top-0 left-6 z-10 sm:left-10">{`Get to Know ${program.title}`}</TabBanner>
                <div className="relative rounded-3xl bg-gradient-to-br from-white/90 to-transparent p-1 lg:[clip-path:polygon(0_0,100%_0,88%_100%,25%_100%,15%_93%,0_93%)]">
                  <div
                    className={`${panelNoBorder} relative rounded-[calc(1.5rem-3px)] px-6 pt-10 pb-14 sm:px-10 lg:pr-24 lg:[clip-path:polygon(0_0,100%_0,88%_100%,25%_100%,15%_93%,0_93%)]`}
                  >
                    <h2 id="program-about" className="font-heading text-lg font-bold text-orange-light">
                      What is {program.title}?
                    </h2>
                    <p className="mt-1.5 font-heading text-sm leading-relaxed text-white sm:text-base">
                      <RichText text={program.description} />
                    </p>
                    {program.details?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mt-3 font-heading text-sm leading-relaxed text-white/95 sm:text-base"
                      >
                        <RichText text={paragraph} />
                      </p>
                    ))}

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

                    <div className="relative mt-6">
                      <ReadMore program={program} className="sm:min-w-[240px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Illustration card – clipped diagonally on the left, like the IBCC page */}
              <div className="relative hidden lg:mt-7 lg:block">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/90 to-transparent p-[3px] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]">
                  <div className="relative h-full w-full rounded-[calc(1.5rem-3px)] bg-glass-blue shadow-[0_12px_32px_rgb(10_63_184/0.35)] lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
                </div>
                <div className="relative h-full min-h-[300px] w-full">
                  <img src={yellowChess} alt="" className="pointer-events-none absolute top-[15%] left-[30%] w-36 rotate-345 select-none drop-shadow-xl sm:w-40" />
                  <img src={blueChess} alt="" className="pointer-events-none absolute top-[8%] right-8 w-16 rotate-25 select-none drop-shadow-md sm:w-20" />
                  <img src={starYellowGlow} alt="" className="animate-float pointer-events-none absolute bottom-6 left-[14%] w-20 select-none" />
                  <img src={goldKey} alt="" className="pointer-events-none absolute -right-24 -bottom-8 w-28 rotate-25 select-none drop-shadow-xl sm:w-60" />
                </div>
              </div>
            </div>
          </section>
        </BackgroundSection>
      </div>

      <Footer />
    </div>
  )
}

export default ProgramDetailPage
