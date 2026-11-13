// Content for the landing page. Items marked TODO still use placeholder copy
// from the UI/UX mockup and need final content before launch.

export interface TimelineItem {
  title: string
  date: string
  startDate: string
  endDate: string
}

// TODO: replace with the real schedule (mockup repeats one placeholder).
export const timeline: TimelineItem[] = [
  { title: 'Open Registration', date: '30th October - 19th December 2026', startDate: '2026-10-30', endDate: '2026-12-19' },
  { title: 'Preliminary Submission', date: '31st December 2026', startDate: '2026-12-31', endDate: '2026-12-31' },
  { title: 'Preliminary Deliberation', date: '4th January - 10th January 2027', startDate: '2027-01-04', endDate: '2027-01-10' },
  { title: 'Semifinal Annoucement', date: '11th January 2027', startDate: '2027-01-11', endDate: '2027-01-11' },
  { title: 'Semifinal Re-Registration & Submission', date: '12th January - 19 January 2027', startDate: '2027-01-12', endDate: '2027-01-19' },
  { title: 'Semifinal Deliberation', date: '20th January - 24th January 2027', startDate: '2027-01-20', endDate: '2027-01-24' },
  { title: 'Final Annoucement', date: '25 January 2027', startDate: '2027-01-25', endDate: '2027-01-25' },
]


export interface ProgramCard {
  tab: string
  title: string
  description: string
  href: string
}

export const competitions: ProgramCard[] = [
  {
    tab: 'Business Model Canvas',
    title: 'Business Model Canvas',
    description:
      'A high school-level competition where participants develop innovative business ideas using the Business Model Canvas framework.',
    href: '/competition/business-model-canvas',
  },
  {
    tab: 'International BCC',
    title: 'International Business Case Competition',
    description:
      'Provide a high-level international platform for top student teams to sharpen strategic and analytical skills by solving real-world business problems.',
    href: '/ibcc',
  },
]

export const events: ProgramCard[] = [
  {
    tab: 'Business Masterclass',
    title: 'Business Masterclass',
    description:
      'A preparation class aimed at equipping participants with the foundational knowledge and skills needed for succeeding in BCC and BPC through workshops and expert guidance.',
    href: '/events/business-masterclass',
  },
  {
    tab: 'Chambers',
    title: 'Chambers',
    description:
      'A one-day offline event featuring sessions with experts who will share their experiences, recruitment tips, and job opportunities. A networking event with great chance to talk directly with professionals and peers.',
    href: '/events/chambers',
  },
  {
    tab: 'Summit Visit',
    title: 'Summit Visit',
    description:
      'An interactive on-site program that provides participants with direct exposure to real company operations and case related to the company.',
    href: '/events/summit-visit',
  },
  {
    tab: 'International Conference',
    title: 'International Conference',
    description:
      'Serve as the grand closing platform bringing together students, economists, and stakeholders to discuss economic trends and celebrate competition winners.',
    href: '/events/international-conference',
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
      'Each program has its own audience. Business Model Canvas is open to high school students, while IBCC is open to undergraduate university students from all universities across Indonesia, and international students are welcome too.',
  },
  {
    question: 'What activities are included in the summit?',
    answer:
      'The summit consists of two competitions (Business Model Canvas and International Business Case Competition) and events such as the Business Masterclass, Chambers, Summit Visit, and International Conference.',
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

/** IBCC contact persons (WhatsApp). Numbers are written with +62 instead of a leading 0. */
export const contactPersons: ContactPerson[] = [
  { name: 'Enzo', phone: '+62 852 2024 0044' },
  { name: 'Nadira', phone: '+62 889 0593 3549' },
]

/** General contact persons for the Contact page (WhatsApp). The IBCC contacts above stay separate. */
export const generalContactPersons: ContactPerson[] = [
  { name: 'Naura', phone: '+62 812 1197 7827' },
  { name: 'Natasya', phone: '+62 818 0742 7182' },
]

/** Who people can reach on WhatsApp when something goes wrong ("please contact our team"). */
export const supportContact = {
  name: 'Rafki',
  phone: '+62 852 8397 1917',
  whatsappUrl: `https://wa.me/6285283971917?text=${encodeURIComponent('Hello, I need help with the SxC International Summit website.')}`,
}

// TODO: fill in the official social media URLs.
export const socials = {
  instagram: 'https://www.instagram.com/sxcintersummit/',
  linkedin: 'https://www.linkedin.com/company/sxcintersummit/posts/',
  tiktok: 'https://www.tiktok.com/@intersummitsxc',
}

/** Where partnership enquiries go. VITE_CONTACT_EMAIL overrides the default marketing address. */
export const contactEmail: string =
  ((import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? '').trim() ||
  'marketing.sxcintersummit@gmail.com'
