import { useState } from 'react'
import { SectionTitle } from '@/components/landing/ui'
import { OutlinedText } from '@/components/about/AboutShared'
import winnerPhoto from '@/assets/images/img-ibcc-winner-team.jpg'

interface Testimony {
  teamName: string
  award: string
  quote: string
  photo: string
}

// TODO: replace this placeholder with the real testimony from the previous winner.
const testimonies: Testimony[] = [
  {
    teamName: 'Ikangoyangdumang',
    award: 'Best Pitch Deck of International Business Case Competition 2026',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper at turpis vel rhoncus. Pellentesque placerat accumsan metus, sed malesuada sapien fermentum ac. Nunc suscipit, justo ultricies congue iaculis, leo sapien vehicula lorem, a mattis diam purus ac mauris. Quisque tincidunt viverra finibus. Maecenas euismod diam aliquet semper porta. Duis libero leo, feugiat eu turpis ac, interdum lobortis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non maximus diam, at ornare nunc. Pellentesque aliquam, ex ut dapibus mollis, elit diam maximus lectus, non ullamcorper lacus nisl non elit. Etiam euismod vel nibh eget varius.',
    photo: winnerPhoto,
  },
]

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const isPrev = direction === 'prev'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Previous testimony' : 'Next testimony'}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-[#6f9ff0]/80 text-[#1748be] shadow-[0_4px_14px_rgba(0,40,130,0.3)] transition-transform hover:scale-105 focus-visible:ring-4 focus-visible:ring-white/60 focus-visible:outline-none active:scale-95 ${
        isPrev ? '-left-2 lg:-left-14' : '-right-2 lg:-right-14'
      }`}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isPrev ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6'} />
      </svg>
    </button>
  )
}

export function IbccTestimonySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = testimonies[currentIndex]

  const prev = () => setCurrentIndex((i) => (i === 0 ? testimonies.length - 1 : i - 1))
  const next = () => setCurrentIndex((i) => (i === testimonies.length - 1 ? 0 : i + 1))

  return (
    <section
      id="testimony"
      className="relative mx-auto w-full max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Previous Winner&apos;s Testimony
      </SectionTitle>

      <div className="relative mx-auto max-w-[860px]">
        <div className="rounded-[28px] bg-white px-6 py-8 shadow-[0_0_24px_rgba(255,255,255,0.45)] sm:px-10 md:py-10">
          <div className="grid items-start gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
            {/* Team photo (soft-faded into the card) + name + award */}
            <div className="flex flex-col items-center text-center">
              <img
                src={current.photo}
                alt={current.teamName}
                className="h-auto w-full max-w-[300px] object-cover mix-blend-multiply"
                style={{
                  filter: 'contrast(1.06) brightness(1.04)',
                  maskImage:
                    'radial-gradient(ellipse 62% 62% at 50% 46%, #000 55%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 62% 62% at 50% 46%, #000 55%, transparent 100%)',
                }}
              />
              <OutlinedText
                stroke={5}
                className="font-heading mt-2 text-lg leading-tight font-extrabold sm:text-xl"
              >
                {current.teamName}
              </OutlinedText>
              <p className="font-body mt-2 max-w-[260px] text-sm text-[#f59e0b]">{current.award}</p>
            </div>

            {/* Quote */}
            <div className="flex flex-col">
              <OutlinedText
                stroke={5}
                className="font-heading text-base leading-tight font-extrabold sm:text-lg"
              >
                What they say about IBCC?
              </OutlinedText>
              <p className="font-body mt-4 text-sm leading-relaxed text-[#4b5563]">
                {current.quote}
              </p>
            </div>
          </div>
        </div>

        <ArrowButton direction="prev" onClick={prev} />
        <ArrowButton direction="next" onClick={next} />
      </div>
    </section>
  )
}

export default IbccTestimonySection
