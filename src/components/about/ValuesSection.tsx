import judgeIcon from '@/assets/about/ic-judge.svg'
import thunderIcon from '@/assets/about/ic-thunder.svg'
import groupIcon from '@/assets/about/ic-group.svg'
import { AboutPill, OutlinedText } from './AboutShared'

const values = [
  {
    title: 'Ethic',
    icon: judgeIcon,
    ratio: 'aspect-[150/158]',
    text: 'Providing SDGs and knowledge to create change',
  },
  {
    title: 'Empowerment',
    icon: thunderIcon,
    ratio: 'aspect-[129/134]',
    text: 'Embracing diverse voices in every initiative',
  },
  {
    title: 'Inclusivity',
    icon: groupIcon,
    ratio: 'aspect-[128/134]',
    text: 'Practicing fairness, responsibility, and integrity',
  },
]

function ValuesSection() {
  return (
    <section
      id="about-values"
      aria-labelledby="about-values-title"
      className="relative mx-auto w-full min-h-screen flex flex-col justify-center max-w-[1200px] px-4 sm:px-6 py-16"
    >
      <AboutPill id="about-values-title">Our Values</AboutPill>
      <p className="font-body mx-auto mt-5 max-w-3xl text-center text-sm font-medium text-white sm:text-lg">
        They don&apos;t evolve over time, influence how we operate, and help us stay aligned with
        our future goals.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {values.map((v) => (
          <article
            key={v.title}
            className="group relative flex h-full min-h-[440px] flex-col items-center justify-between rounded-[32px] sm:rounded-[36px] border-2 border-white/75 bg-[linear-gradient(180deg,#b1d4ff_0%,#80b1f7_100%)] px-6 py-10 text-center shadow-[0_12px_28px_rgba(0,40,130,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,40,130,0.38)]"
          >
            {/* Value Title */}
            <div className="flex w-full justify-center">
              <OutlinedText
                stroke={4}
                className="font-heading text-2xl font-bold tracking-wide sm:text-3xl"
              >
                <h3 className="px-1">{v.title}</h3>
              </OutlinedText>
            </div>

            {/* Value Icon */}
            <div className="my-6 flex items-center justify-center">
              <img
                src={v.icon}
                alt=""
                aria-hidden="true"
                className={`w-30 sm:w-34 md:w-38 ${v.ratio} object-contain drop-shadow-[0_10px_20px_rgba(0,40,120,0.25)] transition-transform duration-300 group-hover:scale-105`}
              />
            </div>

            {/* Value Description */}
            <p className="font-heading max-w-[260px] text-xl font-bold leading-snug text-[#024fac] sm:text-[22px]">
              {v.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ValuesSection
