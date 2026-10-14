import { usePageTitle } from '@/hooks/usePageTitle'
import { BlueColorFilterDefs } from '@/components'
import IbccHero from '@/components/ibccLanding/IbccHero'
import AboutSection from '@/components/landing/AboutSection'
import { CaseCollaboratorSection } from '@/components/landing/PartnersSection'
import TimelineSection from '@/components/landing/TimelineSection'
import IbccBenefitsSection from '@/components/ibccLanding/IbccBenefitsSection'
import IbccTestimonySection from '@/components/ibccLanding/IbccTestimonySection'
import FaqSection from '@/components/landing/FaqSection'
import Footer from '@/components/landing/Footer'
import {
  BackgroundSection,
  AboutBackground,
  TimelineBackground,
  PartnersBackground,
} from '@/components/landing/Backgrounds'
import type { FaqItem } from '@/data/landing'

const ibccFaqs: FaqItem[] = [
  {
    question: 'Will I get mentoring on any particular stage?',
    answer:
      'Yes! Finalists will receive exclusive mentoring sessions from experienced industry professionals and business leaders to refine their pitches and case solutions before the grand final.',
  },
  {
    question: 'Do I have to use English for the competition?',
    answer:
      'Yes, as an international competition, all case submissions, executive summaries, pitch decks, and final presentations must be conducted in English.',
  },
  {
    question: 'Can you elaborate about crack-the-case format?',
    answer:
      'Participants will receive a comprehensive real-world business case developed in collaboration with our industry partner. Teams will have a designated timeframe to diagnose the problem, develop data-driven strategies, and deliver actionable recommendations.',
  },
]

export default function IbccPage() {
  usePageTitle('IBCC | SxC International Summit 2026')

  return (
    <div className="bg-landing relative overflow-hidden">
      <BlueColorFilterDefs />

      {/* Hero Section */}
      <IbccHero />

      {/* Content bands mirroring Home architecture */}
      <div className="relative flex flex-col pt-8 sm:pt-16">
        {/* Band 1: Get to Know IBCC, Total Prize & Case Collaborator */}
        <BackgroundSection background={<AboutBackground />}>
          <AboutSection prizeText="13.500.000+" joinHref="/register" />
          <CaseCollaboratorSection />
        </BackgroundSection>

        {/* Band 2: Timeline & Benefits */}
        <BackgroundSection background={<TimelineBackground />}>
          <TimelineSection />
          <IbccBenefitsSection />
        </BackgroundSection>

        {/* Band 3: Previous Winner's Testimony & FAQ */}
        <BackgroundSection background={<PartnersBackground />}>
          <IbccTestimonySection />
          <FaqSection items={ibccFaqs} />
        </BackgroundSection>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
