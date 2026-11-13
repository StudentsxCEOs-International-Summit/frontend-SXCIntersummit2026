import { useRef } from 'react'
import { competitions, events } from '@/data/landing'
import { ProgramCard, SectionTitle } from './ui'

/** Small gold label that names a group inside the shared Events panel. */
function GroupLabel({ children }: { children: string }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h3 className="bg-gold-gloss font-heading shrink-0 rounded-full border-2 border-white/90 px-5 py-1 text-sm font-extrabold tracking-wide text-brand-blue-700 uppercase italic shadow-[0_4px_12px_rgb(244_163_0/0.4)] sm:text-base">
        {children}
      </h3>
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/70 to-transparent" />
    </div>
  )
}

function CarouselButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous events' : 'Next events'}
      className="bg-glass-blue flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 text-white shadow-[0_4px_12px_rgb(10_63_184/0.35)] transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
    >
      <svg
        className={`h-5 w-5 ${direction === 'prev' ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </button>
  )
}

/**
 * Competitions are part of the events, so both live in one panel under one title instead of two
 * unrelated sections. The #competitions and #events anchors are kept for the footer links.
 */
export function ProgramsSection() {
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <section id="events" className="w-full mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Events</SectionTitle>

      <div className="mx-auto mt-8 max-w-[1100px] rounded-[2rem] border-2 border-white/40 bg-white/10 p-3 shadow-[0_12px_40px_rgba(0,40,130,0.25)] backdrop-blur-sm sm:p-5">
        <div id="competitions" className="scroll-mt-28">
          <GroupLabel>Competitions</GroupLabel>
          <div className="flex flex-wrap justify-center gap-6">
            {competitions.map((card) => (
              <div key={card.title} className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
                <ProgramCard card={card} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <GroupLabel>More Events</GroupLabel>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap">
            <div className="order-2 sm:order-1"><CarouselButton direction="prev" onClick={() => scroll(-1)} /></div>
            <ul
              ref={trackRef}
              className="order-1 flex w-full snap-x snap-mandatory scroll-px-3 gap-6 overflow-x-auto px-3 pt-3 pb-6 sm:order-2 sm:w-auto sm:flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {events.map((card) => (
                <li
                  key={card.title}
                  className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <ProgramCard card={card} />
                </li>
              ))}
            </ul>
            <div className="order-3"><CarouselButton direction="next" onClick={() => scroll(1)} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
