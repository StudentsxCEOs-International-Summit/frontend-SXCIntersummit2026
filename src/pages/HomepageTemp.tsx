import HeroSection from '@/Components/landing/HeroSection'
import AboutSection from '@/Components/landing/AboutSection'
import TimelineSection from '@/Components/landing/TimelineSection'
import { CompetitionsSection, EventsSection } from '@/Components/landing/ProgramsSection'
import FaqSection from '@/Components/landing/FaqSection'
import { CaseCollaboratorSection, MediaPartnerSection } from '@/Components/landing/PartnersSection'
import ContactSection from '@/Components/landing/ContactSection'
import Footer from '@/Components/landing/Footer'
import {
  BackgroundSection,
  AboutBackground,
  TimelineBackground,
  ProgramsBackground,
  PartnersBackground,
} from '@/Components/landing/Backgrounds'

function HomePageTemp() {
  return (
    <div className="bg-landing relative overflow-hidden">
      <HeroSection />
      <div className="relative flex flex-col pt-8 sm:pt-16">
        <BackgroundSection background={<AboutBackground />}>
          <AboutSection />
        </BackgroundSection>

        <BackgroundSection background={<TimelineBackground />}>
          <TimelineSection />
        </BackgroundSection>

        <BackgroundSection background={<ProgramsBackground />}>
          <CompetitionsSection />
          <EventsSection />
        </BackgroundSection>

        <BackgroundSection background={<PartnersBackground />}>
          <FaqSection />
          <CaseCollaboratorSection />
          <MediaPartnerSection />
          <ContactSection />
        </BackgroundSection>
      </div>
      <Footer />
    </div>
  )
}

export default HomePageTemp
