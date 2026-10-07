import { OutlinedText } from './AboutShared'

function TaglineSection() {
  return (
    <section
      id="about-tagline"
      aria-labelledby="about-tagline-title"
      className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-4 text-center sm:gap-8 sm:px-6"
    >
      <h2
        id="about-tagline-title"
        className="bg-glass-blue rounded-2xl border-2 border-white/90 px-10 py-2 shadow-[0_0_30px_rgba(2,98,244,0.6)] sm:px-14"
      >
        <OutlinedText
          stroke={6}
          className="font-heading text-xl leading-tight font-extrabold tracking-tight italic md:text-[1.75rem]"
        >
          Tagline
        </OutlinedText>
      </h2>
      <p className="font-heading leading-tight">
        <OutlinedText
          stroke={10}
          className="text-3xl font-extrabold tracking-tight italic sm:text-5xl lg:text-6xl"
        >
          &ldquo;Foster True Innovation&rdquo;
        </OutlinedText>
      </p>
    </section>
  )
}

export default TaglineSection
