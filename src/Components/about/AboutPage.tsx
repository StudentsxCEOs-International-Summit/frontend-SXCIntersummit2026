import AboutHero from './AboutHero'
import JakartaSection from './JakartaSection'
import SummitSection from './SummitSection'
import TaglineSection from './TaglineSection'
import VisionMissionSection from './VisionMissionSection'
import ValuesSection from './ValuesSection'
import MilestonesSection from './MilestonesSection'
import GlobalReachSection from './GlobalReachSection'
import EventsSection from './EventsSection'
import { BlueColorFilterDefs } from '../BlueColorFilter'
import { BackgroundSection } from '../landing/Backgrounds'
import { TimelineBackground, ProgramsBackground } from '../landing/Backgrounds' // We can reuse some backgrounds or make a single wrapper

function AboutPage() {
  return (
    <main className="bg-[#010a30] relative w-full overflow-hidden text-white min-h-screen">
      <BlueColorFilterDefs />
      
      <AboutHero />
      
      <div className="relative flex flex-col gap-24 sm:gap-32 pb-24">
        {/* We can use the BackgroundSection wrappers to add the decorative elements behind the sections */}
        <BackgroundSection background={<TimelineBackground />}>
          <JakartaSection />
          <SummitSection />
        </BackgroundSection>

        <TaglineSection />

        <BackgroundSection background={<ProgramsBackground />}>
          <VisionMissionSection />
          <ValuesSection />
        </BackgroundSection>

        <MilestonesSection />
        <GlobalReachSection />
      </div>

      <EventsSection />
    </main>
  )
}

export default AboutPage
