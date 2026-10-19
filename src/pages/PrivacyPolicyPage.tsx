import { Link } from 'react-router-dom'

const LAST_UPDATED = 'October 2026'

interface Section {
  title: string
  content: string | string[]
}

const sections: Section[] = [
  {
    title: '1. Information We Collect',
    content: [
      'Personal Identification Information: Name, email address, phone number, institution name, and other details you provide when registering for the StudentsxCEOs International Summit 2026 (SXC Intersummit).',
      'Event & Competition Data: Team information, project submissions, competition entries, and related materials you submit through our platform.',
      'Usage Data: Information about how you access and interact with our website, including IP address, browser type, pages visited, and timestamps.',
      'Communications: Records of correspondence when you contact us through our platform or email.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    content: [
      'To register and manage your participation in SXC Intersummit 2026 events and competitions.',
      'To communicate important event updates, schedules, and announcements.',
      'To process team registrations, verify eligibility, and coordinate competition logistics.',
      'To improve our website experience and services.',
      'To comply with legal obligations and protect the rights and safety of participants.',
    ],
  },
  {
    title: '3. Sharing of Information',
    content:
      'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners, sponsors, and event organizers involved in SXC Intersummit 2026 solely for operational purposes. Any such partners are contractually required to maintain the confidentiality and security of your data.',
  },
  {
    title: '4. Data Retention',
    content:
      'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including for event documentation and post-event communications. You may request deletion of your data at any time by contacting us.',
  },
  {
    title: '5. Cookies & Tracking Technologies',
    content:
      'Our website may use cookies and similar tracking technologies to enhance your browsing experience and gather usage analytics. You may disable cookies through your browser settings; however, some features of the website may not function correctly without them.',
  },
  {
    title: '6. Data Security',
    content:
      'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or disclosure. While we strive to maintain high security standards, no method of data transmission or storage is 100% secure.',
  },
  {
    title: '7. Your Rights',
    content: [
      'Access: Request a copy of the personal information we hold about you.',
      'Correction: Request that we correct inaccurate or incomplete information.',
      'Deletion: Request that we delete your personal data, subject to legal requirements.',
      'Opt-Out: Unsubscribe from marketing and non-essential communications at any time.',
    ],
  },
  {
    title: '8. Third-Party Links',
    content:
      'Our website may contain links to external websites. We are not responsible for the privacy practices of those sites. We encourage you to read the privacy policy of any external website you visit.',
  },
  {
    title: '9. Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our platform after changes constitutes acceptance of the revised policy.',
  },
  {
    title: '10. Contact Us',
    content:
      'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at the official StudentsxCEOs International Summit channels.',
  },
]

function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#010a30] text-white">
      {/* Hero Banner */}
      <div
        className="relative w-full py-24 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #010a30 0%, #0a1f6b 50%, #0262F4 100%)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(2,98,244,0.35) 0%, transparent 70%)',
          }}
        />
        <p className="relative z-10 text-sm font-semibold uppercase tracking-widest text-blue-300 mb-3">
          Legal
        </p>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Privacy Policy
        </h1>
        <p className="relative z-10 mt-4 text-white/60 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Intro */}
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-12">
          StudentsxCEOs International Summit 2026 ("SXC Intersummit", "we", "our", or "us") is
          committed to protecting your privacy. This Privacy Policy explains how we collect, use,
          and safeguard your information when you use our website and services.
        </p>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                {section.title}
              </h2>
              <div
                className="h-px w-12 mb-4 rounded-full"
                style={{ background: 'linear-gradient(90deg, #0262F4, transparent)' }}
              />
              {Array.isArray(section.content) ? (
                <ul className="flex flex-col gap-2 pl-5 list-none">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/75 text-base leading-relaxed">
                      <span
                        className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full"
                        style={{ background: '#0262F4' }}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white/75 text-base leading-relaxed">{section.content}</p>
              )}
            </section>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} StudentsxCEOs International Summit. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
              ← Home
            </Link>
            <Link
              to="/terms-of-service"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicyPage

