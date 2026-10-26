import { AngledPanel, CardLabel } from './AboutShared'

const missions = [
  'Innovator mindset building',
  'Ethical innovation practice',
  'Resilience through uncertainty',
  'Collaborative innovation ecosystem',
]

function VisionMissionSection() {
  return (
    <section
      id="about-vision-mission"
      aria-label="Vision and Mission"
      className="relative mx-auto grid w-full max-w-[1200px] gap-10 px-4 pt-5 sm:px-6 md:grid-cols-2 md:gap-2"
    >
      {/* Vision – tab on the left, right edge angled. Nudged toward the centre so the two
          slanted edges sit close together, like the Figma. */}
      <article className="relative pt-6 md:translate-x-7">
        <div className="absolute top-0 left-[8%] z-10 w-44 sm:w-52">
          <CardLabel side="right" className="w-full" textClassName="text-base sm:text-lg">
            <h3 className="px-2">Vision</h3>
          </CardLabel>
        </div>
        <AngledPanel side="right" className="h-full" innerClassName="px-6 pt-10 pb-6 md:px-12 md:pt-8">
          <p className="font-heading px-2 text-left text-base leading-snug sm:text-lg md:px-4">
            <span className="block font-bold text-[#0b3d91]">
              Empowering Youth To Become Ethical Innovators
            </span>
            <span className="mt-1 block font-semibold text-primary">
              Navigating and Creating Sustainable Impact.
            </span>
          </p>
        </AngledPanel>
      </article>

      {/* Mission – tab on the right, left edge angled */}
      <article className="relative pt-6 md:-translate-x-7">
        <div className="absolute top-0 right-[4%] z-10 w-44 sm:w-52">
          <CardLabel side="left" className="w-full" textClassName="text-base sm:text-lg">
            <h3 className="px-2">Mission</h3>
          </CardLabel>
        </div>
        <AngledPanel side="left" className="h-full" innerClassName="px-6 pt-10 pb-6 md:px-0 md:pt-8">
          <ol className="font-heading flex w-full flex-col gap-3 text-sm font-medium text-[#0b3d91] sm:text-base md:gap-2 md:pr-6 md:pl-[18%]">
            {missions.map((m, i) => (
              <li key={m} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-[0_2px_6px_rgba(2,98,244,0.4)]">
                  {i + 1}
                </span>
                {m}
              </li>
            ))}
          </ol>
        </AngledPanel>
      </article>
    </section>
  )
}

export default VisionMissionSection