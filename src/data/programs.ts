import { socials } from '@/data/landing'

// The SxC International Summit 2026 series: one entry per competition / event.
// The nav dropdowns list these by name; each one with its own page (`slug`) explains it there,
// and the page's "Read More" goes to the same link as the card on the home page.
//
// Text may mark the important parts with **double asterisks**; the page renders them in bold.
// Content comes from the committee's requirement documents. Anything that is not confirmed (dates that
// contradict each other, fees, participant numbers, unsigned speakers) is deliberately left out, and exact
// dates are never shown on the pages: only the month or the status (the start/end fields below just
// drive the Ongoing / Coming Soon / Completed sticker).

export type ProgramCategory = 'competition' | 'event'

export type TimelineStatus = 'done' | 'ongoing' | 'soon' | 'tba'

export interface ProgramTimelineItem {
  title: string
  /** Shown as written, e.g. "24 October - 18 November 2026". */
  dateText: string
  /** Day range in WIB (YYYY-MM-DD) used to work out whether it is done, ongoing or coming. */
  start?: string
  end?: string
  /** Forces a status when there is no fixed date yet. */
  status?: TimelineStatus
}

export interface ProgramFact {
  kind: 'when' | 'where' | 'who'
  label: string
  value: string
  /** Makes the card a link (opens in a new tab). */
  href?: string
}

export interface ProgramFaq {
  question: string
  answer: string
}

export interface Program {
  slug: string
  category: ProgramCategory
  title: string
  /** Definition shown on the program's own page (from the series slide). */
  description: string
  /** Extra paragraphs under the definition. */
  details?: string[]
  /** Quick facts shown right under the hero: when, where and who it is for. */
  facts?: ProgramFact[]
  /** The program's grand theme, shown as a quote. */
  theme?: string
  /** Who the program is for. */
  audience?: string
  /** What participants take home. */
  benefits?: string[]
  timeline?: ProgramTimelineItem[]
  faqs?: ProgramFaq[]
  /** Where "Read More" goes. Leave out when the link is not ready yet. */
  readMoreHref?: string
  /** Several links behind one Read More (the visitor picks one in a small dialog). */
  readMoreChoices?: { label: string; href: string }[]
  /** Programs that already have a dedicated page elsewhere (IBCC). */
  pagePath?: string
}

export const TIMELINE_STATUS_LABEL: Record<TimelineStatus, string> = {
  done: 'Completed',
  ongoing: 'Ongoing',
  soon: 'Coming Soon',
  tba: 'To Be Announced',
}

/** Done / ongoing / coming soon for a timeline step, from its dates (WIB) unless it forces a status. */
export function timelineStatus(item: ProgramTimelineItem, now: Date = new Date()): TimelineStatus {
  if (item.status) return item.status
  if (!item.end) return 'tba'

  const end = new Date(`${item.end}T23:59:59+07:00`)
  if (now > end) return 'done'
  if (!item.start) return 'ongoing'
  return now >= new Date(`${item.start}T00:00:00+07:00`) ? 'ongoing' : 'soon'
}

/**
 * Whether a program is already running: Ongoing once any step has started (or some are finished and
 * others are still to come), Completed when everything is done, Coming Soon before anything starts.
 * Programs with no steps listed have no status.
 */
export function programStatus(program: Program, now: Date = new Date()): TimelineStatus | null {
  if (!program.timeline?.length) return null

  const statuses = program.timeline.map((item) => timelineStatus(item, now))
  if (statuses.every((status) => status === 'done')) return 'done'
  if (statuses.includes('ongoing') || statuses.includes('done')) return 'ongoing'
  return 'soon'
}

export const programs: Program[] = [
  {
    slug: 'business-model-canvas',
    category: 'competition',
    title: 'Business Model Canvas',
    facts: [
      {
        kind: 'when',
        label: 'Registration',
        value: 'Extended: see the latest timeline on Instagram',
        href: socials.instagram,
      },
      { kind: 'where', label: 'Format', value: 'Competition for high school students' },
      { kind: 'who', label: 'Open to', value: 'High school students' },
    ],
    description:
      'A **high school-level competition** where participants develop **innovative business ideas** using the **Business Model Canvas** framework.',
    details: [
      'The Business Model Canvas is a one-page framework that maps a business on a single canvas: **customers, value proposition, channels and revenue**. Participants use it to turn an idea into a structured, realistic business model.',
      'The competition is open to **high school students** and is part of the SxC International Summit 2026 series.',
    ],
    timeline: [
      // Registration was extended to 17-19 October 2026; the later stages are still to be announced.
      { title: 'Registration', dateText: 'Extended registration', end: '2026-10-19' },
      { title: 'Competition stages', dateText: 'See the Instagram highlight for the updated timeline', status: 'tba' },
    ],
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
    facts: [
      { kind: 'when', label: 'When', value: 'To be announced' },
      { kind: 'where', label: 'Where', value: 'Online preparation class' },
      { kind: 'who', label: 'Open to', value: 'High school and college students' },
    ],
    description:
      'A **preparation webinar** aimed at equipping participants with the **foundational knowledge and skills** needed for succeeding in **BCC and BPC** through **workshops and expert guidance**.',
    details: [
      'Held together with **Strativate**, the masterclass has **two tracks: BPC and BCC**. Pick the one that matches the competition you are preparing for.',
      'It is designed to help you **develop strategic thinking, problem-solving and business planning skills** before the business competitions begin.',
    ],
    theme: 'Empowering Business Innovation with Technology and Strategic Thinking',
    audience:
      '**College and high school students** who want to excel in business case and business plan competitions, from any major or academic background. Beginners are welcome.',
    benefits: [
      'A **comprehensive preparation class** for both Business Case and Business Plan competitions',
      '**Insights and guidance** from people with proven expertise in business competitions',
      '**Hands-on case study practice** in a real-competition setting',
      '**Interactive Q&A** to build understanding and critical thinking',
      '**Learning materials** to support your journey beyond the class',
    ],
    timeline: [
      { title: 'BPC class registration', dateText: 'Closing in October 2026', end: '2026-10-21' },
      { title: 'BCC class registration', dateText: 'Closing in October 2026', end: '2026-10-23' },
      { title: 'Class day (online)', dateText: 'To be announced', status: 'tba' },
    ],
    faqs: [
      {
        question: 'Do I need prior experience in business competitions?',
        answer:
          'No. The masterclass is beginner-friendly and designed to give you your first exposure to business competitions.',
      },
      {
        question: 'Who is eligible to participate?',
        answer: 'All high school and undergraduate students, from any major or academic background, are welcome to join.',
      },
      {
        question: 'Will I have to present my ideas during the practical session?',
        answer:
          'Presenting is voluntary. Participants who would like live feedback can present their work during the practical session.',
      },
      {
        question: 'Will all participants get a certificate?',
        answer:
          'Participants receive an official certificate if they join the entire session and submit the required case study, either a business analysis or a business idea. The case study is designed to be manageable while still reflecting real business situations, and it can be submitted up to two days after the event.',
      },
    ],
    readMoreChoices: [
      { label: 'BPC Masterclass', href: 'https://www.instagram.com/stories/highlights/17912968011556973/' },
      { label: 'BCC Masterclass', href: 'https://www.instagram.com/stories/highlights/17912162274541833/' },
    ],
  },
  {
    slug: 'chambers',
    category: 'event',
    title: 'Chambers',
    facts: [
      { kind: 'when', label: 'When', value: 'To be announced' },
      { kind: 'where', label: 'Where', value: 'Offline · Jakarta, Depok and Tangerang' },
      { kind: 'who', label: 'Open to', value: 'Undergraduates and fresh graduates' },
    ],
    description:
      'Chambers is a **one-day offline career preparation event** that provides **in-depth insights and real-world experiences across 4 key industries**. It features expert sessions on **job overviews, recruitment tips and career opportunities**, with an exclusive chance to **network directly with professionals and peers**.',
    theme: 'Rising Above Empty Acceleration: Empowering Resilient Talents for True Career Competence',
    benefits: [
      '**Expert and industry insights**: direct material presentations and live panel discussions with top professionals',
      '**Live HR review**: a chance to get your CV and LinkedIn profile reviewed live on stage',
      '**Hands-on case solving**: apply strategic thinking to real-world career challenges',
      '**Intimate networking**: connect directly with dedicated industry mentors',
      '**Recruitment preparation toolkit**: practical tips and frameworks for CV building, LinkedIn optimization and interview preparation',
      '**Talent pool access**: potential career and internship exposure through partner companies',
    ],
    timeline: [
      {
        title: 'Registration',
        dateText: 'Registration open',
        start: '2026-10-24',
        end: '2026-11-18',
      },
      {
        title: 'Event day',
        dateText: 'To be announced',
        start: '2026-11-21',
        end: '2026-11-21',
      },
    ],
    faqs: [
      {
        question: 'Who can register for Chambers 2026?',
        answer:
          'Chambers is open to undergraduate students and fresh graduates who live in or can easily reach the JaDeTa (Jakarta, Depok, Tangerang) area.',
      },
      {
        question: 'Can I select more than one industry preference?',
        answer:
          'Yes. When you register you can submit a primary and a secondary industry preference. If the quota for your first choice is already full, your registration automatically falls back to your second choice.',
      },
      {
        question: 'Will everyone get their CV and LinkedIn profile reviewed by the HR professional?',
        answer:
          'Live reviews on stage are limited to a few profiles selected from the registration submissions. All participants, however, receive the Recruitment Preparation Toolkit with complete review guidelines and tips.',
      },
      {
        question: 'How will I receive updates or reminders about the event?',
        answer:
          'All essential information, updates and reminders are shared through the participants’ WhatsApp group, which you join after completing your registration.',
      },
    ],
    readMoreHref:
      'https://www.instagram.com/s/aGlnaGxpZ2h0OjE3ODc0NDc4MzgzNjAyMDcz?psln=Y3RmM3Fhb3AydWRs',
  },
  {
    slug: 'summit-visit',
    category: 'event',
    title: 'Summit Visit',
    facts: [
      { kind: 'when', label: 'When', value: 'To be announced' },
      { kind: 'where', label: 'Where', value: 'On-site at the host company’s office' },
      { kind: 'who', label: 'Open to', value: 'Selected participants' },
    ],
    description:
      'An **interactive on-site program** that gives participants **direct exposure to real company operations** and the **cases the company works on**.',
    details: [
      'The Summit Visit gives participants **direct exposure to professional environments**, letting them **observe operations firsthand and interact with industry practitioners**. It bridges classroom learning with real-world insights and helps students understand industry dynamics.',
      'Visits take place **on-site at the host company’s office** (location to be announced), and joining is **free**. Company visits from earlier editions now continue as the **Summit Visit**.',
    ],
    theme: 'Igniting Future Potential Through Industry Exploration',
    benefits: [
      '**Networking** with people from the host company',
      '**Industry exposure** to how a real business runs',
      '**Internship session**, adapted to each company',
    ],
    timeline: [
      { title: 'Registration', dateText: 'Open', status: 'ongoing' },
      { title: 'Visit day', dateText: 'To be announced', status: 'tba' },
    ],
    faqs: [
      {
        question: 'What is the purpose of a Summit Visit?',
        answer:
          'A company visit gives participants real-world exposure to a company’s operations, culture and business strategies. It helps bridge the gap between theory and practice by showing how professionals apply knowledge and technology in actual business settings.',
      },
      {
        question: 'What is the dress code for the Summit Visit?',
        answer:
          'A white shirt (kemeja putih) with a black suit or blazer (jas hitam atau blazer). Please make sure your outfit looks neat and professional: it reflects the formality of the visit and shows respect to the host company.',
      },
      {
        question: 'Is there a selection process for the Summit Visit?',
        answer:
          'Yes. If the number of interested participants exceeds the available quota, participants are selected based on the requirements provided by the company.',
      },
      {
        question: 'What should participants prepare before the Summit Visit?',
        answer:
          'Learn about the company beforehand, follow the dress code, arrive on time and take an active part throughout the visit.',
      },
    ],
    readMoreHref: 'https://www.instagram.com/stories/highlights/18107733020258013/',
  },
  {
    slug: 'international-conference',
    category: 'event',
    title: 'International Conference',
    facts: [
      { kind: 'when', label: 'When', value: 'To be announced' },
      { kind: 'where', label: 'Where', value: 'To be announced' },
      { kind: 'who', label: 'Open to', value: 'High school students, undergraduates and fresh graduates' },
    ],
    description:
      'The summit’s **peak event**: an opportunity for individuals from **all backgrounds** to **present their perspectives on current economic trends** and **engage with leading economists and industry experts**.',
    details: [
      'In a fast-changing world, businesses must go beyond stability and embrace **adaptability, intelligence and continuous innovation**. Participants gain **actionable insights, strategic perspectives and hands-on knowledge** to reimagine how businesses can thrive in tomorrow’s dynamic landscape.',
      'It is the **grand closing platform** of the series, celebrating the winners of the competitions.',
    ],
    theme:
      'Thriving Through Economic Uncertainty: Empowering the Next Generation for a Resilient and Innovative Economy',
    audience:
      '**High school students, undergraduates and fresh graduates** interested in economics, business or entrepreneurship, and leadership.',
    benefits: [
      '**Practical insights** into agile and adaptive strategies for the dynamic landscape of modern business',
      '**A platform to interact** with economists, industry experts and fellow participants, opening doors to future collaboration',
      '**Career-oriented discussions** with professionals who have shown adaptability and resilience in their own careers',
    ],
    timeline: [
      { title: 'Registration', dateText: 'To be announced', status: 'tba' },
      { title: 'Event day', dateText: 'To be announced', status: 'tba' },
    ],
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
