import AboutHero from '../components/about/AboutHero'
import JakartaSection from '../components/about/JakartaSection'
import SummitSection from '../components/about/SummitSection'
import TaglineSection from '../components/about/TaglineSection'
import VisionMissionSection from '../components/about/VisionMissionSection'
import ValuesSection from '../components/about/ValuesSection'
import MilestonesSection from '../components/about/MilestonesSection'
import GlobalReachSection from '../components/about/GlobalReachSection'
import EventsSection from '../components/about/EventsSection'
import { BlueColorFilterDefs } from '../components/BlueColorFilter'
import BackgroundAbout from '../components/about/backgroundAbout/BackgroundAbout'

function AboutPage() {
  return (
    <main className="bg-landing relative w-full overflow-hidden text-white min-h-screen z-0">
      <BlueColorFilterDefs />
      
      {/* Background layer */}
      <BackgroundAbout />

      {/* Content layer */}
      <div className="relative z-10 ">
        <AboutHero />

        <div className="relative flex flex-col min-h-screen gap-24 sm:gap-32 pb-24">
          <div>
            <JakartaSection />
            <SummitSection />
          </div>
          <div>
            <TaglineSection />
            <VisionMissionSection />
          </div>
          <div>
            
            <ValuesSection />
          </div>

          <MilestonesSection />
          <GlobalReachSection />
        </div>

        <EventsSection />
      </div>
    </main>
  )
}

export default AboutPage
