import HeroSection from '@/components/landing/HeroSection'
import AboutSection from '@/components/landing/AboutSection'
import TimelineSection from '@/components/landing/TimelineSection'
import { ProgramsSection } from '@/components/landing/ProgramsSection'
import FaqSection from '@/components/landing/FaqSection'
import { CaseCollaboratorSection, MediaPartnerSection } from '@/components/landing/PartnersSection'
import ContactSection from '@/components/landing/ContactSection'
import Footer from '@/components/landing/Footer'

import {
  BackgroundSection,
  AboutBackground,
  TimelineBackground,
  ProgramsBackground,
  PartnersBackground,
} from '@/components/landing/Backgrounds'

function HomePage() {
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
          <ProgramsSection />
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

export default HomePage
