import buildings from '@/assets/landing/footer-buildings.webp'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star_glow.svg'
import cursor from '@/assets/ic-cursor.svg'
import { ArrowIcon, GoldButton } from './ui'

// TODO: swap `buildings` for the hero building photo once it's exported from Figma.
function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[640px] items-center justify-center px-4 pt-32 pb-40 sm:min-h-screen"
    >
      <img
        src={buildings}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity [mask-image:linear-gradient(180deg,#000_55%,transparent_100%)]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(214_226_255/0.55)_0%,rgb(92_130_245/0.45)_40%,rgb(92_130_245/0)_100%)]" />

      <img
        src={diamonds}
        alt=""
        className="animate-float-slow absolute -top-4 -left-24 w-56 sm:-left-28 sm:w-96"
      />
      <img
        src={diamonds}
        alt=""
        className="animate-float absolute top-[45%] -right-24 w-56 -scale-x-100 sm:-right-24 sm:w-96"
      />
      <img src={starGlow} alt="" className="absolute -bottom-10 -left-24 w-56 -rotate-12 sm:w-80" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-outline-blue font-heading text-4xl leading-tight sm:text-6xl">
          <span className="block font-bold">StudentsxCEOs</span>
          <span className="block font-extrabold tracking-tight italic">
            International Summit 2026
          </span>
        </h1>
        <p className="text-outline-blue mt-6 font-heading text-xl font-extrabold italic sm:text-3xl">
          Foster True Innovation
        </p>
        <div className="relative mt-10">
          <GoldButton href="#about">
            Get Started <ArrowIcon diagonal />
          </GoldButton>
          <img
            src={cursor}
            alt=""
            className="animate-float absolute -right-24 top-12 hidden w-12 sm:block"
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
