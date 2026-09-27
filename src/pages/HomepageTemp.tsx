import dice from '@/assets/ic-dice.svg'
import diamonds from '@/assets/ic-diamonds.svg'
import starGlow from '@/assets/ic-star_glow.svg'
import starYellowGlow from '@/assets/ic-star_yellowglow.svg'
import HeroSection from '@/Components/landing/HeroSection'
import AboutSection from '@/Components/landing/AboutSection'
import TimelineSection from '@/Components/landing/TimelineSection'
import { CompetitionsSection, EventsSection } from '@/Components/landing/ProgramsSection'
import FaqSection from '@/Components/landing/FaqSection'
import { CaseCollaboratorSection, MediaPartnerSection } from '@/Components/landing/PartnersSection'
import ContactSection from '@/Components/landing/ContactSection'
import Footer from '@/Components/landing/Footer'

/** Floating decorations along the page edges, positioned as in the mockup. */
function Decorations() {
  const base = 'pointer-events-none absolute hidden select-none md:block'
  return (
    <div aria-hidden="true">
      <img
        src={starYellowGlow}
        alt=""
        className={`${base} animate-float-slow top-[1500px] -right-40 w-80`}
      />
      <img src={starGlow} alt="" className={`${base} top-[2650px] -left-28 w-64 -rotate-12`} />
      <img
        src={dice}
        alt=""
        className={`${base} animate-float top-[3450px] -right-16 w-44 -rotate-12`}
      />
      <img
        src={dice}
        alt=""
        className={`${base} top-[3900px] -left-24 w-52 rotate-12 opacity-80 blur-[1px] hue-rotate-[180deg] saturate-50`}
      />
      <img
        src={diamonds}
        alt=""
        className={`${base} animate-float-slow top-[4550px] -right-32 w-72`}
      />
    </div>
  )
}

function HomePage() {
  return (
    <div className="bg-landing relative overflow-hidden">
      <Decorations />
      <HeroSection />
      <div className="relative flex flex-col gap-24 sm:gap-32 pt-20 sm:pt-32">
        <AboutSection />
        <TimelineSection />
        <CompetitionsSection />
        <EventsSection />
        <FaqSection />
        <CaseCollaboratorSection />
        <MediaPartnerSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
