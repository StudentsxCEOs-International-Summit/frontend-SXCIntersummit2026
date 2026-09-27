import dice from '@/assets/ic-dice.svg'
import star from '@/assets/ic-star.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'
import blueStar from '@/assets/ic-bluestar.svg'
import { ArrowIcon, GoldButton } from './ui'

function TabBanner({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      className={`bg-gold-gloss text-outline-blue inline-block -skew-x-[20deg] border-b-4 border-[#e89400] px-10 py-2 font-heading text-2xl font-extrabold shadow-[0_6px_16px_rgb(244_163_0/0.4)] sm:text-[1.75rem] ${className}`}
    >
      <span className="inline-block skew-x-[20deg]">{children}</span>
    </div>
  )
}

const panel =
  'bg-glass-blue border-[3px] border-white/90 shadow-[0_12px_32px_rgb(10_63_184/0.35)] overflow-hidden'

// TODO: the chess / case study / key illustrations still need to be exported
// from Figma; the star and dice assets are used as stand-ins for now.
function AboutSection() {
  return (
    <section
      id="about"
      className="w-full relative mx-auto max-w-[1200px] scroll-mt-28 px-4 sm:px-6"
    >
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <div className="relative pt-7">
          <TabBanner className="absolute top-0 left-6 z-10 sm:left-10">Get to Know IBCC</TabBanner>
          <div className={`${panel} rounded-[28px] rounded-br-[80px] px-6 pt-14 pb-10 sm:px-12`}>
            <h3 className="font-heading text-xl font-bold text-orange-light">What is IBCC?</h3>
            <p className="mt-2 font-heading text-base leading-relaxed text-white sm:text-lg">
              <strong className="font-bold">
                The International Business Case Competition (IBCC)
              </strong>{' '}
              is the core event of the International Summit where participants are challenged to
              solve real-world business problems through professional collaboration. Through this
              year&apos;s theme, we aim to harness the potential of growing technology to thrive on
              the modern age of business.
            </p>
            <h3 className="mt-7 font-heading text-xl font-bold text-orange-light">
              Who can Participate?
            </h3>
            <p className="mt-2 font-heading text-base leading-relaxed text-white sm:text-lg">
              IBCC is exclusively open to{' '}
              <strong className="font-bold">
                undergraduate university students from all universities across Indonesia.
              </strong>
            </p>
            <GoldButton href="#competitions" className="mt-8 sm:min-w-[320px]">
              Join Now <ArrowIcon />
            </GoldButton>
          </div>
        </div>

        <div
          className={`${panel} relative hidden min-h-[400px] rounded-3xl lg:mt-7 lg:block lg:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]`}
          aria-hidden="true"
        >
          <img src={starYellowGlow} alt="" className="animate-float absolute top-6 right-6 w-52" />
          <img src={blueStar} alt="" className="absolute top-10 left-[30%] w-16" />
          <img src={dice} alt="" className="absolute bottom-6 left-[26%] w-56 -rotate-6" />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.7fr] lg:grid-cols-[1.1fr_0.75fr_1.9fr]">
        <div
          className={`${panel} relative hidden h-[220px] rounded-3xl lg:block`}
          aria-hidden="true"
        >
          <img src={dice} alt="" className="absolute -bottom-6 left-10 w-48 rotate-12" />
        </div>

        <div
          className={`${panel} relative hidden h-[220px] -skew-x-[20deg] rounded-3xl sm:block`}
          aria-hidden="true"
        >
          <img src={star} alt="" className="absolute top-6 left-6 w-16 skew-x-[20deg]" />
          <img
            src={star}
            alt=""
            className="animate-float absolute right-6 bottom-8 w-24 skew-x-[20deg]"
          />
        </div>

        <div className="relative pt-7 sm:col-span-2 lg:col-span-1">
          <TabBanner className="absolute top-0 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap">
            Total Prize Up To:
          </TabBanner>
          <div
            className={`${panel} flex h-[220px] items-center justify-center rounded-3xl pt-8 lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]`}
          >
            <p className="text-outline-blue font-heading text-4xl font-extrabold sm:text-6xl">
              Rp.20.000.000
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
