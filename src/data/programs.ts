// The SxC International Summit 2026 series: one entry per competition / event.
// The nav dropdowns list these by name; each one with its own page (`slug`) explains it there,
// and the page's "Read More" goes to the same link as the card on the home page.

export type ProgramCategory = 'competition' | 'event'

export interface Program {
  slug: string
  category: ProgramCategory
  title: string
  /** Definition shown on the program's own page (from the series slide). */
  description: string
  /** Where "Read More" goes. Leave out when the link is not ready yet. */
  readMoreHref?: string
  /** Several links behind one Read More (the visitor picks one in a small dialog). */
  readMoreChoices?: { label: string; href: string }[]
  /** Programs that already have a dedicated page elsewhere (IBCC). */
  pagePath?: string
}

export const programs: Program[] = [
  {
    slug: 'business-model-canvas',
    category: 'competition',
    title: 'Business Model Canvas',
    description:
      'A high school-level competition where participants develop innovative business ideas using the Business Model Canvas framework.',
    readMoreHref:
      'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTE4OTExMDIwNDYxNjE0?srtk=OHVwNHFxMXA2djZz',
  },
  {
    slug: 'ibcc',
    category: 'competition',
    title: 'International Business Case Competition',
    description:
      'The International Business Case Competition is the main event of the International Summit, where participants work together to solve real-world business problems.',
    pagePath: '/ibcc',
  },
  {
    slug: 'business-masterclass',
    category: 'event',
    title: 'Business Masterclass',
    description:
      'A preparation webinar aimed at equipping participants with the foundational knowledge and skills needed for succeeding in BCC and BPC through workshops and expert guidance.',
    readMoreChoices: [
      { label: 'BPC Masterclass', href: 'https://www.instagram.com/stories/highlights/17912968011556973/' },
      { label: 'BCC Masterclass', href: 'https://www.instagram.com/stories/highlights/17912162274541833/' },
    ],
  },
  {
    slug: 'chambers',
    category: 'event',
    title: 'Chambers',
    description:
      'Chambers is an offline career preparation program that shares job overviews, experiences, and recruitment tips. It provides an exclusive opportunity for fresh graduates and undergraduates to gain knowledge and interact with experts as they pursue their future careers. Chambers provides in-depth insights and experiences from 4 key industries.',
    readMoreHref:
      'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc0NDc4MzgzNjAyMDcz?psln=Y3RmM3Fhb3AydWRs',
  },
  {
    slug: 'summit-visit',
    category: 'event',
    title: 'Summit Visit',
    description:
      'An interactive on-site program that provides participants with direct exposure to real company operations and case related to the company.',
    readMoreHref: 'https://www.instagram.com/stories/highlights/18107733020258013/',
  },
  {
    slug: 'international-conference',
    category: 'event',
    title: 'International Conference',
    description:
      'The SxC International Summit as the peak event that provides an opportunity for individuals from all backgrounds to present their perspectives on current economic trends and engage with leading industry experts.',
  },
]

/** Route of a program's page: its own page when it has one, otherwise /competition/:slug or /events/:slug. */
export const programPath = (program: Program) =>
  program.pagePath ?? `/${program.category === 'competition' ? 'competition' : 'events'}/${program.slug}`

export const programsOf = (category: ProgramCategory) => programs.filter((p) => p.category === category)

export const findProgram = (category: ProgramCategory, slug: string | undefined) =>
  programs.find((p) => p.category === category && p.slug === slug && !p.pagePath)

/** Dropdown entries for the navigation bar: names only, each linking to the program's page. */
export const competitionMenu = programsOf('competition').map((p) => ({ label: p.title, href: programPath(p) }))
export const eventMenu = programsOf('event').map((p) => ({ label: p.title, href: programPath(p) }))
