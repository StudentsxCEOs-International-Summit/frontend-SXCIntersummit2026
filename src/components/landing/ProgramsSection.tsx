import { useRef } from 'react'
import { competitions, events } from '@/data/landing'
import { ProgramCard, SectionTitle } from './ui'

export function CompetitionsSection() {
  return (
    <section id="competitions" className="w-full mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Competitions</SectionTitle>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {competitions.map((card) => (
          <ProgramCard key={card.title} card={card} />
        ))}
      </div>
    </section>
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
      className="bg-glass-blue flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-white/80 text-white shadow-[0_4px_12px_rgb(10_63_184/0.35)] transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95"
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

export function EventsSection() {
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }

  return (
    <section id="events" className="w-full mx-auto max-w-[1300px] scroll-mt-28 px-4 sm:px-6">
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">Events</SectionTitle>
      <div className="mt-12 flex items-center gap-3 sm:gap-5">
        <CarouselButton direction="prev" onClick={() => scroll(-1)} />
        <ul
          ref={trackRef}
          className="flex flex-1 snap-x snap-mandatory gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {events.map((card) => (
            <li
              key={card.title}
              className="w-full shrink-0 snap-start sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
            >
              <ProgramCard card={card} />
            </li>
          ))}
        </ul>
        <CarouselButton direction="next" onClick={() => scroll(1)} />
      </div>
    </section>
  )
}
