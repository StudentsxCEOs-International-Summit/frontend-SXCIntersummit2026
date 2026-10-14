import { useState } from 'react'
import { SectionTitle } from '@/components/landing/ui'
import winnerPhoto from '@/assets/images/img-ibcc-winner-team.jpg'

interface Testimony {
  teamName: string
  award: string
  quote: string
  photo: string
}

const testimonies: Testimony[] = [
  {
    teamName: 'Ikangoyangdumang',
    award: 'Best Pitch Deck of International Business Case Competition 2026',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper at turpis vel rhoncus. Pellentesque placerat accumsan metus, sed malesuada sapien fermentum ac. Nunc suscipit, justo ultricies congue iaculis, leo sapien vehicula lorem, a mattis diam purus ac mauris. Quisque tincidunt viverra finibus. Maecenas euismod diam aliquet semper porta. Duis libero leo, feugiat eu turpis ac, interdum lobortis nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non maximus diam, at ornare nunc. Pellentesque aliquam, ex ut dapibus mollis, elit diam maximus lectus, non ullamcorper lacus nisl non elit. Etiam euismod vel nibh eget varius.',
    photo: winnerPhoto,
  },
]

export function IbccTestimonySection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = testimonies[currentIndex]

  const prev = () => {
    setCurrentIndex((i) => (i === 0 ? testimonies.length - 1 : i - 1))
  }

  const next = () => {
    setCurrentIndex((i) => (i === testimonies.length - 1 ? 0 : i + 1))
  }

  return (
    <section
      id="testimony"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <SectionTitle className="bg-[linear-gradient(100deg,#FFFFFF_0%,#0262F4_85%,#003F9E_100%)]">
        Previous Winner&apos;s Testimony
      </SectionTitle>

      <div className="relative mx-auto mt-12 max-w-4xl">
        {/* Main Card */}
        <div className="rounded-[36px] bg-white p-6 sm:p-10 md:p-12 shadow-[0_16px_40px_rgba(2,98,244,0.3)] border-2 border-white/90">
          <div className="grid items-center gap-6 md:grid-cols-[1.1fr_1.9fr] md:gap-10">
            {/* Left Column: Team Photo & Name */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-[280px] overflow-hidden rounded-2xl shadow-md">
                <img
                  src={current.photo}
                  alt={current.teamName}
                  className="h-auto w-full object-cover"
                />
              </div>
              <h4 className="mt-5 font-heading text-xl font-extrabold text-[#1748be] sm:text-2xl">
                {current.teamName}
              </h4>
              <p className="mt-1 font-body text-xs font-bold text-[#f59e0b] sm:text-sm">
                {current.award}
              </p>
            </div>

            {/* Right Column: Testimony Quote */}
            <div className="flex flex-col justify-center">
              <h3 className="font-heading text-xl font-extrabold text-[#1748be] sm:text-2xl">
                What they say about IBCC?
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-[#4b5563] sm:text-base">
                {current.quote}
              </p>
            </div>
          </div>
        </div>

        {/* Circular Navigation Buttons */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimony"
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg
            className="h-6 w-6 stroke-white"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next testimony"
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg
            className="h-6 w-6 stroke-white"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default IbccTestimonySection
