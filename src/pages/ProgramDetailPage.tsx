import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePageTitle } from '@/hooks/usePageTitle'
import building from '@/assets/ic-buildingus.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star-glow.svg'
import Footer from '@/components/landing/Footer'
import { ArrowIcon, ChoiceDialog, GoldButton, SectionTitle } from '@/components/landing/ui'
import { OutlinedText } from '@/components/about/AboutShared'
import NotFoundPage from '@/pages/NotFoundPage'
import { findProgram, programPath, programsOf, type ProgramCategory } from '@/data/programs'

const glassCard =
  'bg-glass-blue rounded-2xl border-2 border-white/70 shadow-[0_10px_28px_rgba(0,40,130,0.3)]'

const CATEGORY_LABEL: Record<ProgramCategory, { singular: string; others: string }> = {
  competition: { singular: 'Competition', others: 'Other Competitions' },
  event: { singular: 'Event', others: 'Other Events' },
}

/**
 * One page per competition / event: what it is, plus a "Read More" that goes to the same link as the
 * card on the home page. Reached from the Competition and Events menus (/competition/:slug, /events/:slug).
 */
function ProgramDetailPage({ category }: { category: ProgramCategory }) {
  const { slug } = useParams()
  const program = findProgram(category, slug)
  const [pickerOpen, setPickerOpen] = useState(false)
  usePageTitle(program?.title ?? 'Page not found')

  if (!program) return <NotFoundPage />

  const label = CATEGORY_LABEL[category]
  const others = programsOf(category).filter((p) => p.slug !== program.slug)

  return (
    <div className="bg-landing relative overflow-hidden">
      <section className="relative flex min-h-[56svh] items-center justify-center px-4 pt-32 pb-14 sm:min-h-[64vh] sm:pt-44">
        <img
          src={building}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-115 origin-center object-cover select-none [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]" />
        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway pointer-events-none absolute top-16 -left-12 w-44 rotate-225 select-none sm:-top-4 sm:-left-28 sm:w-96" />
        <img src={diamonds} alt="" aria-hidden="true" className="animate-sway-slow pointer-events-none absolute top-[70%] -right-12 w-40 rotate-45 select-none sm:top-[45%] sm:-right-24 sm:w-96" />
        <img src={starGlow} alt="" aria-hidden="true" className="animate-twinkle pointer-events-none absolute -bottom-6 -left-10 w-40 -rotate-12 select-none sm:-bottom-10 sm:-left-24 sm:w-72" />

        <div className="relative z-10 text-center">
          <span className="bg-gold-gloss font-heading inline-block rounded-full border-2 border-white/90 px-5 py-1 text-xs font-extrabold tracking-[0.16em] text-brand-blue-700 uppercase italic shadow-[0_4px_12px_rgb(244_163_0/0.4)] sm:text-sm">
            {label.singular}
          </span>
          <h1 className="mt-5 select-none">
            <OutlinedText stroke={10} className="font-heading text-4xl font-extrabold tracking-tight italic sm:text-5xl md:text-7xl">
              {program.title}
            </OutlinedText>
          </h1>
          <p className="font-body mx-auto mt-6 max-w-xl text-sm text-white sm:text-base">
            SxC International Summit 2026 Series
          </p>
        </div>
      </section>

      <div className="relative mx-auto flex w-full max-w-[900px] flex-col gap-14 px-4 pb-24 sm:px-6">
        <section aria-labelledby="program-about">
          <SectionTitle id="program-about" className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
            About
          </SectionTitle>
          <div className={`${glassCard} mt-8 rounded-3xl p-6 text-center sm:p-9`}>
            <p className="font-body text-base leading-relaxed text-white sm:text-lg">{program.description}</p>

            <div className="mt-7 flex justify-center">
              {program.readMoreHref ? (
                <GoldButton href={program.readMoreHref}>
                  Read More <ArrowIcon />
                </GoldButton>
              ) : program.readMoreChoices ? (
                <>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="bg-gold-gloss text-outline-sm font-heading text-body-base inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/90 px-8 py-2.5 font-bold shadow-[0_4px_16px_rgb(245_158_11/0.45)] transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
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
              ) : (
                <p className="font-heading rounded-full border-2 border-white/80 bg-white/15 px-6 py-2 text-sm font-semibold text-white">
                  More details will be announced soon.
                </p>
              )}
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section aria-labelledby="program-others">
            <SectionTitle id="program-others" className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
              {label.others}
            </SectionTitle>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    to={programPath(other)}
                    className={`${glassCard} group flex h-full items-center justify-between gap-4 p-5 transition hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none`}
                  >
                    <span className="font-heading text-base font-bold text-white sm:text-lg">{other.title}</span>
                    <span className="bg-gold-gloss flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/90 text-brand-blue-700 shadow-[0_3px_8px_rgba(244,163,0,0.45)] transition-transform group-hover:translate-x-0.5">
                      <ArrowIcon />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProgramDetailPage
