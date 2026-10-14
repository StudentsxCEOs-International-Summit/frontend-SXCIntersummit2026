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
      className="relative mx-auto grid w-full max-w-[1200px] gap-12 py-10 px-4 sm:px-6 md:grid-cols-2 md:gap-6"
    >
      {/* Vision – tab on the left, right edge angled */}
      <article className="relative pt-7">
        <CardLabel
          side="right"
          className="absolute -bottom-[18%] left-[10%] z-10 w-48 sm:w-53"
          textClassName="text-lg sm:text-xl"
        >
          <h3 className='px-2'>Vision</h3>
        </CardLabel>
        <AngledPanel
          side="right"
          className="h-full"
          innerClassName="px-8 pt-8 pb-6 md:px-12"
        >
          <p
            className={`font-heading px-4 md:px-10 text-center text-base leading-snug font-bold sm:text-lg lg:text-xl ${cardText}`}
          >
            Empowering Youth To Become Ethical Innovators{' '}
            <br/>
            <span className="text-primary">And Creating Sustainable Impact.</span>
          </p>
        </AngledPanel>
      </article>

      {/* Mission – tab on the right, left edge angled */}
      <article className="relative pt-7">
        <CardLabel
          side="left"
          className="absolute -bottom-[18%] left-[10%] z-10 w-60 sm:w-68"
          textClassName="text-lg sm:text-xl"
        >
          <h3 className='px-2'>Mission</h3>
        </CardLabel>
        <AngledPanel
          side="left"
          className="h-full"
          innerClassName="pt-8 pb-6 "
        >
          <ol
            className={`font-body flex list-decimal flex-col gap-1 pl-20 text-xs font-medium marker:font-bold sm:text-sm lg:text-base ${cardText}`}
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
