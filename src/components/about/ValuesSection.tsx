import judgeIcon from '@/assets/about/ic-judge.webp'
import thunderIcon from '@/assets/about/ic-thunder.webp'
import groupIcon from '@/assets/about/ic-group.webp'
import { useState, type CSSProperties } from 'react'
import { AboutPill, OutlinedText, glassCardEdge } from './AboutShared'

const values = [
  {
    title: 'Ethic',
    icon: judgeIcon,
    ratio: 'aspect-[150/158]',
    text: 'Providing tools and knowledge to create change',
    tilt: 15,
    tapTilt: 15,
  },
  {
    title: 'Empowerment',
    icon: thunderIcon,
    ratio: 'aspect-[129/134]',
    text: 'Embracing diverse voices in every initiative',
    tilt: 4,
    tapTilt: -12,
  },
  {
    title: 'Inclusivity',
    icon: groupIcon,
    ratio: 'aspect-[128/134]',
    text: 'Practicing fairness, responsibility, and integrity',
    tilt: -15,
    tapTilt: -15,
  },
]

function ValuesSection() {
  // Phones: cards are flat until tapped, then lean left or right like the desktop 3D tilt.
  const [leaning, setLeaning] = useState<string | null>(null)
  const toggle = (title: string) => setLeaning((current) => (current === title ? null : title))

  return (
    <section
      id="about-values"
      aria-labelledby="about-values-title"
      className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center px-4 sm:px-6"
    >
      <AboutPill id="about-values-title">Our Values</AboutPill>
      <p className="font-body mx-auto text-center text-sm font-normal text-white sm:text-base lg:whitespace-nowrap">
        They define who we are, influence how we operate, and help us stay aligned with our future
        goals.
      </p>

      <div className="mx-auto mt-6 grid w-full max-w-[1000px] gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {values.map((v) => (
          <article
            key={v.title}
            style={
              {
                '--tilt': `${v.tilt}deg`,
                '--lean': leaning === v.title ? `${v.tapTilt}deg` : '0deg',
              } as CSSProperties
            }
            role="button"
            tabIndex={0}
            aria-pressed={leaning === v.title}
            onClick={() => toggle(v.title)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggle(v.title)
              }
            }}
            className={`group relative flex h-full min-h-[260px] cursor-pointer touch-manipulation flex-col items-center justify-between rounded-[14px] select-none [-webkit-tap-highlight-color:transparent] lg:aspect-[245/237] [transform:perspective(850px)_rotateY(var(--lean))] lg:[transform:perspective(850px)_rotateY(var(--tilt))] ${glassCardEdge} bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(196,220,255,0.62)_100%)] px-5 py-6 text-center shadow-[0_8px_24px_rgba(0,40,130,0.25)] transition-all duration-300 hover:-translate-y-1 hover:brightness-105 active:scale-[0.96] active:brightness-110`}
          >
            {/* Value Title */}
            <h3 className="font-heading text-sm font-semibold sm:text-base lg:text-lg">
              <OutlinedText stroke={3}>{v.title}</OutlinedText>
            </h3>

            {/* Value Icon */}
            <div className="my-4 flex w-24 items-center justify-center sm:w-28 lg:w-[40%]">
              <img
                src={v.icon}
                alt=""
                aria-hidden="true"
                className={`w-full ${v.ratio} object-contain drop-shadow-[0_8px_16px_rgba(0,40,120,0.25)] transition-transform duration-300 group-hover:scale-105 group-active:scale-110`}
              />
            </div>

            {/* Value Description */}
            <p className="font-heading max-w-[92%] text-sm leading-snug font-bold text-[#1e4fc4] sm:text-base lg:text-lg">
              {v.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ValuesSection