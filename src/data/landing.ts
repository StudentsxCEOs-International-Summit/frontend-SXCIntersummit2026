// Content for the landing page. Items marked TODO still use placeholder copy
// from the UI/UX mockup and need final content before launch.

export interface TimelineItem {
  title: string
  date: string
  active?: boolean
}

// TODO: replace with the real schedule (mockup repeats one placeholder).
export const timeline: TimelineItem[] = [
  { title: 'BMC Open Registration', date: '15th - 20th October 2026' },
  { title: 'BMC Open Registration', date: '15th - 20th October 2026' },
  { title: 'BMC Open Registration', date: '15th - 20th October 2026', active: true },
  { title: 'BMC Open Registration', date: '15th - 20th October 2026' },
  { title: 'BMC Open Registration', date: '15th - 20th October 2026' },
]

export interface ProgramCard {
  tab: string
  title: string
  description: string
  href: string
}

// TODO: mockup truncates descriptions; confirm the full copy.
export const competitions: ProgramCard[] = [
  {
    tab: 'Business Model Canvas',
    title: 'Business Model Canvas',
    description:
      'Business Model Canvas is a competition exclusively for high school students, to showcase their entrepreneurial skills.',
    href: '#',
  },
  {
    tab: 'International BCC',
    title: 'International Business Case Competition',
    description:
      'The International Business Case Competition is the core event of the International Summit where participants are challenged to solve real-world business problems through professional collaboration.',
    href: '#',
  },
  {
    tab: 'International BPC',
    title: 'International Business Plan Competition',
    description:
      "The International Business Plan Competition is envisioned as the core event of this year's International Summit.",
    href: '#',
  },
]

export const events: ProgramCard[] = [
  {
    tab: 'International Conference',
    title: 'International Conference',
    description:
      'A global forum bringing together speakers and participants to discuss innovations, trends, and opportunities in business.',
    href: '#',
  },
  {
    tab: 'Chambers',
    title: 'Chambers',
    // TODO: mockup reuses the IBPC description here.
    description:
      "The International Business Plan Competition is envisioned as the core event of this year's International Summit.",
    href: '#',
  },
  {
    tab: 'Company Visit',
    title: 'Company Visit',
    description:
      'A two-day webinar exploring career paths in Banking, Consulting, FMCG, and Startups, complete with classes, CV reviews, and more.',
    href: '#',
  },
  {
    tab: 'Business Competition Launchpad',
    title: 'Business Competition Launchpad',
    // TODO: no description in the mockup yet.
    description: 'Details for the Business Competition Launchpad (BCL) will be announced soon.',
    href: '#',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

// TODO: answers are drafts — the mockup only contains the questions.
export const faqs: FaqItem[] = [
  {
    question: 'What is StudentsxCEOs International Summit 2026?',
    answer:
      'StudentsxCEOs International Summit 2026 brings students together to learn, collaborate, and get inspired through a series of competitions and events under the theme "Foster True Innovation".',
  },
  {
    question: 'Who can participate in SxC Inter Summit 2026?',
    answer:
      'Each program has its own audience. Business Model Canvas is open to high school students, while IBCC is open to undergraduate university students from all universities across Indonesia.',
  },
  {
    question: 'What activities are included in the summit?',
    answer:
      'The summit consists of three competitions (Business Model Canvas, International Business Case Competition, International Business Plan Competition) and events such as the International Conference, Chambers, Company Visit, and Business Competition Launchpad.',
  },
  {
    question: 'How can I register as a participant?',
    answer:
      'Sign in to this website, choose the competition or event you want to join, and complete the registration form before the registration period closes.',
  },
  {
    question: "I'm a brand or media outlet, how can I collaborate?",
    answer:
      'We would love to collaborate! Reach out to our contact persons listed below and we will get back to you.',
  },
]

export interface ContactPerson {
  name: string
  phone: string
}

// TODO: placeholder contacts from the mockup.
export const contactPersons: ContactPerson[] = [
  { name: 'Rafki', phone: '0812 3456 7890' },
  { name: 'Rafki', phone: '0812 3456 7890' },
]

// TODO: fill in the official social media URLs.
export const socials = {
  instagram: '#',
  linkedin: '#',
  tiktok: '#',
}
