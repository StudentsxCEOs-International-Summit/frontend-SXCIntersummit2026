import { OutlinedText } from './AboutShared'

function AboutHero() {
  return (
    <section
      id="about-hero"
      aria-labelledby="about-hero-title"
      className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-28 sm:min-h-[820px] lg:min-h-screen"
    >

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
