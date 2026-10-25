import { Link } from 'react-router-dom'

const LAST_UPDATED = 'October 2026'

interface Section {
  title: string
  content: string | string[]
}

const sections: Section[] = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using the StudentsxCEOs International Summit 2026 ("SXC Intersummit") website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.',
  },
  {
    title: '2. Eligibility',
    content: [
      'You must be a currently enrolled student at an accredited educational institution to participate in most SXC Intersummit events and competitions.',
      'Certain programs may have additional eligibility requirements, which will be specified in the relevant event guidelines.',
      'By registering, you confirm that the information you provide is accurate and complete.',
    ],
  },
  {
    title: '3. Registration & Account',
    content: [
      'You are responsible for maintaining the security of your account credentials and for all activities conducted under your account.',
      'One individual may not create multiple accounts or register on behalf of another participant without authorization.',
      'SXC Intersummit reserves the right to suspend or terminate accounts found to be in violation of these terms.',
    ],
  },
  {
    title: '4. Competition Rules & Conduct',
    content: [
      'All submitted work—including business cases, presentations, and project proposals—must be original and created by the registered team members.',
      'Plagiarism, unauthorized use of third-party content, or misrepresentation of your work will result in immediate disqualification.',
      'Participants must treat fellow competitors, judges, organizers, and staff with respect and professionalism at all times.',
      'Decisions made by judges and the organizing committee regarding competition results are final.',
    ],
  },
  {
    title: '5. Intellectual Property',
    content:
      'You retain ownership of original work and materials you submit to SXC Intersummit competitions. However, by submitting your work, you grant SXC Intersummit a non-exclusive, royalty-free license to use, reproduce, and display your submissions for promotional, educational, and documentation purposes related to the event.',
  },
  {
    title: '6. Code of Conduct',
    content: [
      'Harassment, discrimination, or inappropriate behavior of any kind—whether in person at events or through our online platform—will not be tolerated.',
      'Do not attempt to disrupt, hack, or misuse our website or digital systems.',
      'Commercial solicitation or spam directed at other participants is strictly prohibited.',
      'Violations may result in immediate removal from the event without refund.',
    ],
  },
  {
    title: '7. Registration Fees & Payments',
    content:
      'Where applicable, registration fees must be paid in full by the stated deadlines. Refund policies, if any, will be clearly stated at the time of registration. SXC Intersummit is not responsible for payment failures caused by third-party payment processors.',
  },
  {
    title: '8. Limitation of Liability',
    content:
      'SXC Intersummit, its organizers, sponsors, and affiliates shall not be liable for any indirect, incidental, or consequential damages arising from your participation in the event or use of our platform. Our total liability to you shall not exceed the registration fees you paid.',
  },
  {
    title: '9. Event Changes & Cancellation',
    content:
      'SXC Intersummit reserves the right to modify, postpone, or cancel events or competitions at any time due to unforeseen circumstances, including but not limited to force majeure events. We will endeavor to provide timely notice of any significant changes.',
  },
  {
    title: '10. Photography & Media',
    content:
      'By participating in SXC Intersummit 2026, you consent to being photographed or recorded during events. These materials may be used for promotional, educational, or archival purposes. If you have concerns about media usage, please contact the organizing team in advance.',
  },
  {
    title: '11. Governing Law',
    content:
      'These Terms of Service are governed by and construed in accordance with the laws of the Republic of Indonesia. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of courts in Indonesia.',
  },
  {
    title: '12. Changes to These Terms',
    content:
      'We reserve the right to update these Terms of Service at any time. Material changes will be communicated through our website. Continued participation after changes are posted constitutes your acceptance of the revised terms.',
  },
  {
    title: '13. Contact Us',
    content:
      'If you have any questions about these Terms of Service, please reach out to the official StudentsxCEOs International Summit organizing team through our official communication channels.',
  },
]

function TermsOfServicePage() {
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
          Terms of Service
        </h1>
        <p className="relative z-10 mt-4 text-white/60 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        {/* Intro */}
        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-12">
          Please read these Terms of Service carefully before registering for or participating in any
          StudentsxCEOs International Summit 2026 ("SXC Intersummit") events, competitions, or
          programs. These terms govern your use of our platform and services.
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
                    <li
                      key={i}
                      className="flex items-start gap-3 text-white/75 text-base leading-relaxed"
                    >
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
              to="/privacy-policy"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TermsOfServicePage

