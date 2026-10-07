import judgeIcon from '@/assets/About/ic-JUDGE.svg'
import thunderIcon from '@/assets/About/ic-thunder.svg'
import groupIcon from '@/assets/About/ic-group.svg'
import chess from '@/assets/ic-chess.svg'
import wave from '@/assets/About/ic-wave.svg'
import { AboutPill, CardLabel } from './AboutShared'

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
    text: 'Embracing diverse values in every initiative',
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
      className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6"
    >
      {/* Background ribbon + chess piece */}
      <img
        src={wave}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 w-[160%] max-w-none -translate-x-1/2 opacity-60 select-none"
      />
      <img
        src={chess}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-4 hidden w-24 -rotate-12 drop-shadow-xl select-none md:block lg:-left-24 lg:w-36"
      />

      <AboutPill id="about-values-title">Our Values</AboutPill>
      <p className="font-body mx-auto mt-5 max-w-3xl text-center text-sm font-medium text-white sm:text-lg">
        They don&apos;t evolve over time, influence how we operate, and help us stay aligned with
        our future goals.
      </p>

      <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {values.map((v) => (
          <article key={v.title} className="relative pt-6">
            <CardLabel
              side="left"
              className="absolute top-0 left-4 z-10 w-44 sm:w-52"
              textClassName="text-base sm:text-lg"
            >
              <h3>{v.title}</h3>
            </CardLabel>
            <div className="bg-glass-blue group flex h-full flex-col items-center gap-5 rounded-3xl border-[3px] border-white/90 px-6 pt-14 pb-8 text-center shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(255,255,255,0.55)]">
              <img
                src={v.icon}
                alt=""
                aria-hidden="true"
                className={`w-28 ${v.ratio} object-contain drop-shadow-[0_6px_14px_rgba(0,40,120,0.35)] transition-transform duration-300 group-hover:scale-105 sm:w-32`}
              />
              <p className="font-heading max-w-[16rem] text-lg leading-snug font-bold text-orange-light sm:text-xl">
                {v.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ValuesSection
