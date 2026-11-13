import worldMapUrl from '@/assets/about/img-world-map.webp'
import { AboutPill } from './AboutShared'

function GlobalReachSection() {
  return (
    <section
      id="about-global-reach"
      aria-labelledby="about-global-reach-title"
      className="relative mx-auto w-full max-w-[1100px] px-4 sm:px-6"
    >
      <AboutPill id="about-global-reach-title">See Where the Summit Has Reached!</AboutPill>

      {/* Map (includes the institution callouts, flags and logos from Figma) */}
      <div className="relative mx-auto aspect-[1800/951] w-full">
        <div
          aria-hidden="true"
          className="absolute inset-[10%] rounded-full bg-white/20 blur-[90px]"
        />
        <img
          src={worldMapUrl}
          alt="World map showing universities from China, the Netherlands, Australia and Indonesia that have joined the Summit"
          className="relative h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,40,140,0.25)]"
        />
      </div>
    </section>
  )
}

export default GlobalReachSection
