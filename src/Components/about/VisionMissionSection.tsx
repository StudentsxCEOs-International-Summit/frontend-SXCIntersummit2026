import { AngledPanel, CardLabel, cardText } from './AboutShared'

const missions = [
  'Cultivate an innovative mindset in every participant',
  'Promote ethical and responsible innovation',
  'Create real, measurable impact through innovation',
  'Build a collaborative ecosystem for youth and industry',
]

function VisionMissionSection() {
  return (
    <section
      id="about-vision-mission"
      aria-label="Vision and Mission"
      className="relative mx-auto grid w-full max-w-[1200px] gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-6"
    >
      {/* Vision – tab on the left, right edge angled */}
      <article className="relative pt-7">
        <CardLabel
          side="left"
          className="absolute top-0 left-[4%] z-10 w-40 sm:w-48"
          textClassName="text-lg sm:text-xl"
        >
          <h3>Vision</h3>
        </CardLabel>
        <AngledPanel
          clip="polygon(0 0, 100% 0, 91% 100%, 0 100%)"
          className="h-full"
          innerClassName="flex h-full min-h-[200px] items-center justify-center px-8 pt-12 pb-10 md:min-h-[230px] md:pr-[14%] md:pl-10"
        >
          <p
            className={`font-heading text-center text-lg leading-snug font-bold sm:text-xl lg:text-2xl ${cardText}`}
          >
            Empowering Youth To Become Ethical Innovators{' '}
            <span className="text-primary">And Creating Sustainable Impact.</span>
          </p>
        </AngledPanel>
      </article>

      {/* Mission – tab on the right, left edge angled */}
      <article className="relative pt-7">
        <CardLabel
          side="right"
          className="absolute top-0 right-[4%] z-10 w-40 sm:w-48"
          textClassName="text-lg sm:text-xl"
        >
          <h3>Mission</h3>
        </CardLabel>
        <AngledPanel
          clip="polygon(0 0, 100% 0, 100% 100%, 9% 100%)"
          className="h-full"
          innerClassName="flex h-full min-h-[200px] items-center px-8 pt-12 pb-10 md:min-h-[230px] md:pr-8 md:pl-[14%]"
        >
          <ol
            className={`font-body flex list-decimal flex-col gap-1.5 pl-5 text-sm font-medium marker:font-bold sm:text-base ${cardText}`}
          >
            {missions.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
        </AngledPanel>
      </article>
    </section>
  )
}

export default VisionMissionSection
