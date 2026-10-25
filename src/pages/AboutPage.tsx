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

        <div className="relative flex flex-col gap-12 sm:gap-14 pb-16">
          <div className="relative pt-8 sm:pt-12">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-10 -bottom-16 -z-10 bg-[linear-gradient(180deg,rgba(96,160,255,0)_0%,rgba(96,160,255,0.7)_14%,rgba(110,170,255,0.7)_86%,rgba(96,160,255,0)_100%)]" />
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
