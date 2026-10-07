import highBuilding from '@/assets/ic-highbuilding.svg'
import dice from '@/assets/ic-dice.svg'
import { OutlinedText } from './AboutShared'

function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-title"
      className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-28 sm:min-h-[820px] lg:min-h-screen"
    >
      {/* Building backdrop, washed out in light blue and faded into the page gradient */}
      <img
        src={highBuilding}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-70 select-none [mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.75)_0%,rgb(140_175_250/0.55)_40%,rgb(92_130_245/0)_100%)]"
      />

      {/* Dice decorations */}
      <img
        src={dice}
        alt=""
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute top-[24%] -left-10 w-32 -rotate-12 drop-shadow-xl select-none sm:-left-12 sm:w-52 lg:w-64"
      />
      <img
        src={dice}
        alt=""
        aria-hidden="true"
        className="animate-float pointer-events-none absolute top-[52%] -right-10 w-32 rotate-12 drop-shadow-xl select-none sm:-right-12 sm:w-56 lg:w-72"
      />

      <h1
        id="about-hero-title"
        className="relative z-10 flex flex-col items-center text-center leading-tight select-none"
      >
        <OutlinedText
          stroke={10}
          className="px-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          StudentsxCEOs
        </OutlinedText>
        <OutlinedText
          stroke={10}
          className="mt-1 px-4 text-3xl font-extrabold tracking-tight italic sm:mt-2 md:text-6xl lg:text-7xl"
        >
          International Summit 2026
        </OutlinedText>
      </h1>

      {/* Scroll indicator */}
      <a
        href="#sxc-jakarta"
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white focus-visible:outline-none"
      >
        <span className="font-body text-sm font-medium tracking-wide drop-shadow sm:text-base">
          Scroll More
        </span>
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-white/90 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white" />
        </span>
      </a>
    </section>
  )
}

export default AboutHero
