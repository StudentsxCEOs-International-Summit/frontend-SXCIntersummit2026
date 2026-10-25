import { AboutPill, OutlinedText } from './AboutShared'

function TaglineSection() {
  return (
    <section
      id="about-tagline"
      aria-labelledby="about-tagline-title"
      className="relative mx-auto flex w-full max-w-[1200px] flex-col justify-center items-center gap-0 px-4 text-center sm:px-6"
    >
      <AboutPill id="about-tagline-title">Tagline</AboutPill>
      <p className="w-full text-center">
        <OutlinedText
          stroke={5}
          className="font-heading text-xl leading-tight font-semibold tracking-wide italic md:text-3xl lg:text-4xl"
        >
          &ldquo;Foster True Innovation&rdquo;
        </OutlinedText>
      </p>
    </section>
  )
}

export default TaglineSection
