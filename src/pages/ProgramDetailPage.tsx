import { useState, type CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Check, MapPin, Users } from 'lucide-react'
import { usePageTitle } from '@/hooks/usePageTitle'
import { BlueColorFilterDefs } from '@/components'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import starYellowGlow from '@/assets/ic-star-yellow-glow.svg'
import yellowChess from '@/assets/ic-yellow-chess.svg'
import blueChess from '@/assets/ic-chess.svg'
import goldKey from '@/assets/ic-key.svg'
import dice from '@/assets/ic-dice.svg'
import blueDice from '@/assets/ic-blue-dice.svg'
import certIcon from '@/assets/ic-certificate-yellow.svg'
import teamIcon from '@/assets/ic-team-yellow.svg'
import industryIcon from '@/assets/ic-industry-yellow.svg'
import internationalIcon from '@/assets/ic-international-yellow.svg'
import Footer from '@/components/landing/Footer'
import {
  AboutBackground,
  BackgroundSection,
  PartnersBackground,
  TimelineBackground,
} from '@/components/landing/Backgrounds'
import { TabBanner, panelNoBorder } from '@/components/landing/AboutSection'
import FaqSection from '@/components/landing/FaqSection'
import { ArrowIcon, ChoiceDialog, GoldButton, SectionTitle } from '@/components/landing/ui'
import { glassCardEdge } from '@/components/about/AboutShared'
import NotFoundPage from '@/pages/NotFoundPage'
import {
  findProgram,
  programStatus,
  TIMELINE_STATUS_LABEL,
  type Program,
  type ProgramCategory,
  type ProgramFact,
  type TimelineStatus,
} from '@/data/programs'

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

const sectionTitleClass = 'bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]'

/** The light glass card used by the IBCC Benefits section, so these pages share its look. */
const lightCard = `${glassCardEdge} rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(196,220,255,0.62)_100%)] shadow-[0_8px_24px_rgba(0,40,130,0.25)]`

const iconTile =
  'flex shrink-0 items-center justify-center rounded-2xl border border-white/40 bg-[linear-gradient(135deg,#3b82f6_0%,#1d4ed8_100%)] shadow-inner'

const FACT_ICON: Record<ProgramFact['kind'], typeof CalendarDays> = {
  when: CalendarDays,
  where: MapPin,
  who: Users,
}

const BENEFIT_ICONS = [teamIcon, industryIcon, certIcon, internationalIcon]

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

/** "**Label**: explanation" becomes a card title and body; anything else uses its first bold phrase. */
function splitBenefit(text: string): { title: string; body: string } {
  const labelled = text.match(/^\*\*(.+?)\*\*:\s*(.*)$/)
  if (labelled) {
    const body = labelled[2].split('**').join('')
    return { title: labelled[1], body: body.charAt(0).toUpperCase() + body.slice(1) }
  }

  const bold = text.match(/\*\*(.+?)\*\*/)
  const title = bold ? bold[1] : text.replace(/\*\*/g, '')
  return { title: title.charAt(0).toUpperCase() + title.slice(1), body: text.replace(/\*\*/g, '') }
}

/** Sticker-style label that says whether the program is already running. */
function StatusSticker({ status }: { status: TimelineStatus }) {
  return (
    <span className="font-heading relative mt-6 inline-flex -rotate-2 items-center gap-2 overflow-hidden rounded-md border-2 border-white bg-[linear-gradient(180deg,#fff3c4_0%,#fcd65b_55%,#f4a300_100%)] px-4 py-1.5 text-xs leading-none font-extrabold tracking-[0.14em] text-[#1c4fd1] uppercase shadow-[0_4px_10px_rgba(10,40,130,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] sm:text-sm">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white/35" />
      {status === 'done' ? (
        <Check className="relative h-4 w-4" strokeWidth={3} aria-hidden="true" />
      ) : status === 'ongoing' ? (
        <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4a8bff] opacity-80" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1c55d2]" />
        </span>
      ) : (
        <span aria-hidden="true" className="relative h-2.5 w-2.5 rounded-full border-2 border-[#1c55d2]" />
      )}
      <span className="relative">{TIMELINE_STATUS_LABEL[status]}</span>
    </span>
  )
}

/** When, where and who it is for: three light glass cards right under the hero. */
function FactsStrip({ facts }: { facts: ProgramFact[] }) {
  return (
    <section aria-label="Quick facts" className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6">
      <ul className="grid gap-4 sm:grid-cols-3">
        {facts.map((fact) => {
          const Icon = FACT_ICON[fact.kind]
          const body = (
            <>
              <span className={`${iconTile} h-14 w-14`}>
                <Icon className="h-7 w-7 text-[#fcd65b]" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-[11px] font-extrabold tracking-[0.16em] text-[#1d4ed8] uppercase">
                  {fact.label}
                </p>
                <p className="font-heading text-sm leading-snug font-bold text-[#0b3d91] sm:text-base">{fact.value}</p>
              </div>
              {fact.href && (
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#1d4ed8]" strokeWidth={2.5} aria-hidden="true" />
              )}
            </>
          )
          const cardClass = `${lightCard} flex items-center gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:brightness-105 sm:p-5`
          return (
            <li key={fact.label}>
              {fact.href ? (
                <a
                  href={fact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} h-full focus-visible:ring-4 focus-visible:ring-white/70 focus-visible:outline-none`}
                >
                  {body}
                </a>
              ) : (
                <div className={`${cardClass} h-full`}>{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** The grand theme as a quote inside the same bordered glass panel as the "Get to Know" card. */
function ThemePanel({ theme }: { theme: string }) {
  return (
    <section aria-label="Grand theme" className="relative mx-auto w-full max-w-[1000px] px-4 sm:px-6">
      <div className="relative pt-7">
        <TabBanner className="absolute top-0 left-1/2 z-10 -translate-x-1/2">Grand Theme</TabBanner>
        <div className="rounded-3xl bg-gradient-to-br from-white/90 to-transparent p-1">
          <div className={`${panelNoBorder} relative rounded-[calc(1.5rem-3px)] px-6 pt-12 pb-9 text-center sm:px-14`}>
            <img src={starYellowGlow} alt="" aria-hidden="true" className="animate-float pointer-events-none absolute top-4 left-4 w-9 -rotate-12 select-none sm:w-12" />
            <img src={starYellowGlow} alt="" aria-hidden="true" className="animate-float-slow pointer-events-none absolute right-4 bottom-4 w-9 rotate-12 select-none sm:w-12" />
            <p className="font-heading text-xl leading-snug font-extrabold text-white italic sm:text-3xl">
              &ldquo;{theme}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Benefits as the same leaning glass cards (with an icon) as the IBCC Benefits section. */
function BenefitsSection({ benefits }: { benefits: string[] }) {
  // Desktop rows hold three cards; a shorter last row is centred and its cards lean in toward each other.
  const tiltFor = (index: number) => {
    const rowStart = Math.floor(index / 3) * 3
    const rowCount = Math.min(3, benefits.length - rowStart)
    const position = index - rowStart
    if (rowCount === 3) return [12, 0, -12][position]
    if (rowCount === 2) return [10, -10][position]
    return 0
  }
  return (
    <section className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6" aria-labelledby="program-benefits">
      <SectionTitle id="program-benefits" className={sectionTitleClass}>
        Benefits
      </SectionTitle>

      <ul className="relative mx-auto flex max-w-[1000px] flex-wrap justify-center gap-5">
        {benefits.map((benefit, index) => {
          const { title, body } = splitBenefit(benefit)
          const tilt = tiltFor(index)
          return (
            <li key={benefit} className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
              <article
                style={{ '--tilt': `${tilt}deg` } as CSSProperties}
                className={`group ${lightCard} flex h-full flex-col items-center gap-4 px-5 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:brightness-105 lg:[transform:perspective(850px)_rotateY(var(--tilt))]`}
              >
                <span className={`${iconTile} h-20 w-20 transition-transform duration-300 group-hover:scale-105`}>
                  <img
                    src={BENEFIT_ICONS[index % BENEFIT_ICONS.length]}
                    alt=""
                    aria-hidden="true"
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <h3 className="font-heading text-base leading-tight font-extrabold text-[#0b3d91] sm:text-lg">
                  {title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#0b3d91]/85">{body}</p>
              </article>
            </li>
          )
        })}
      </ul>

      <img src={dice} alt="" aria-hidden="true" className="animate-float pointer-events-none absolute bottom-0 -left-6 hidden w-28 rotate-12 drop-shadow-xl select-none 2xl:-left-24 2xl:block 2xl:w-36" />
      <img src={blueDice} alt="" aria-hidden="true" className="animate-float-slow pointer-events-none absolute bottom-0 -right-6 hidden w-28 -rotate-12 drop-shadow-xl select-none 2xl:-right-24 2xl:block 2xl:w-36" />
    </section>
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
 * panel and illustration card, then quick facts, the grand theme, benefits and FAQ. Reached
 * from the Competition and Events menus (/competition/:slug, /events/:slug); "Read More" goes to the
 * link the home page card uses.
 */
function ProgramDetailPage({ category }: { category: ProgramCategory }) {
  const { slug } = useParams()
  const program = findProgram(category, slug)
  usePageTitle(program ? `${program.title} | SxC International Summit 2026` : 'Page not found')

  if (!program) return <NotFoundPage />

  const status = programStatus(program)
  const hasBand2 = Boolean(program.benefits?.length)

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
          {status && <StatusSticker status={status} />}
        </div>
      </section>

      {/* Content bands, mirroring the IBCC page */}
      <div className="relative flex flex-col pt-8 sm:pt-16">
        <BackgroundSection background={<AboutBackground />} className="sm:min-h-0">
          <section className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6" aria-labelledby="program-about">
            <div className="grid gap-1 lg:grid-cols-[1.45fr_1fr]">
              <div className="relative pt-7">
                <TabBanner className="absolute top-0 left-6 z-10 sm:left-10">{`About This ${CATEGORY_LABEL[category]}`}</TabBanner>
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

                    {program.audience && (
                      <>
                        <h3 className="mt-5 font-heading text-lg font-bold text-orange-light">Who can join?</h3>
                        <p className="mt-1.5 font-heading text-sm leading-relaxed text-white sm:text-base">
                          <RichText text={program.audience} />
                        </p>
                      </>
                    )}

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

          {program.facts && program.facts.length > 0 && <FactsStrip facts={program.facts} />}

          {program.theme && <ThemePanel theme={program.theme} />}
        </BackgroundSection>

        {hasBand2 && (
          <BackgroundSection background={<TimelineBackground />} className="sm:min-h-0">
            {program.benefits && program.benefits.length > 0 && <BenefitsSection benefits={program.benefits} />}
          </BackgroundSection>
        )}

        {program.faqs && program.faqs.length > 0 && (
          <BackgroundSection background={<PartnersBackground />} className="sm:min-h-0">
            <FaqSection items={program.faqs.map(({ question, answer }) => ({ question, answer }))} />
          </BackgroundSection>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProgramDetailPage
