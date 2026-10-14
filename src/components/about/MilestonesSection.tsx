import starLeaders from '@/assets/about/ic-star-leaders.svg'
import uniStudents from '@/assets/about/ic-uni-students.svg'
import highSchool from '@/assets/about/ic-highschool.svg'
import { AboutPill } from './AboutShared'

/** Each SVG is the full Figma card (container + icon + figure + caption). */
const milestones = [
  { src: starLeaders, label: '2000+ Future Leaders' },
  { src: uniStudents, label: '87% University Students' },
  { src: highSchool, label: '13% High School Students' },
]

function MilestonesSection() {
  return (
    <section
      id="about-milestones"
      aria-labelledby="about-milestones-title"
      className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-6"
    >
      <AboutPill id="about-milestones-title">Our Milestones</AboutPill>
      <ul className="mx-auto mt-12 grid max-w-md gap-6 sm:max-w-none sm:grid-cols-3 lg:gap-8">
        {milestones.map((m) => (
          <li key={m.label} className="transition-transform duration-300 hover:-translate-y-1">
            <img src={m.src} alt={m.label} className="aspect-[387/206] w-full" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MilestonesSection
