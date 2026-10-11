import AboutHero from '../Components/about/AboutHero'
import JakartaSection from '../Components/about/JakartaSection'
import SummitSection from '../Components/about/SummitSection'
import TaglineSection from '../Components/about/TaglineSection'
import VisionMissionSection from '../Components/about/VisionMissionSection'
import ValuesSection from '../Components/about/ValuesSection'
import MilestonesSection from '../Components/about/MilestonesSection'
import GlobalReachSection from '../Components/about/GlobalReachSection'
import EventsSection from '../Components/about/EventsSection'
import { BlueColorFilterDefs } from '../Components/BlueColorFilter'
import BackgroundAbout from '../Components/about/backgroundAbout/BackgroundAbout'

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
