import { buildRegistrationFormData } from '@/utils/ibccRegistrationPayload'
import type { IbccRegistrationForm, ParticipantInformation } from '@/types/ibccRegistration'

// These expectations mirror back-end/src/features/ibcc/ibcc.schema.ts and storage.service.ts.

const person = (n: number): ParticipantInformation => ({
  fullName: `Person ${n}`,
  email: `p${n}@example.com`,
  whatsapp: '+6281234516789',
  institutionMajor: 'Universitas Indonesia - Management',
  year: '2nd Year',
})

const pdf = (name: string) => new File(['x'], name, { type: 'application/pdf' })

const baseForm = (): IbccRegistrationForm => ({
  teamName: '  Team Alpha ',
  memberArrangement: 'multiple-universities',
  informationSources: ['Friends/Family', 'Instagram'],
  otherInformationSource: '',
  leader: person(1),
  firstMember: person(2),
  secondMember: person(3),
  files: {
    studentId: pdf('a.pdf'),
    instagram: pdf('b.pdf'),
    twibbon: pdf('c.pdf'),
    poster: pdf('d.pdf'),
    broadcast: pdf('e.pdf'),
  },
  agreeToTerms: true,
  confirmParticipation: true,
})

describe('buildRegistrationFormData', () => {
  it('uses the backend enum values and field names', () => {
    const data = buildRegistrationFormData(baseForm())

    expect(data.get('teamName')).toBe('Team Alpha')
    expect(data.get('memberComposition')).toBe('MULTIPLE_UNIVERSITIES')
    // The backend stores one source, so the first pick is sent.
    expect(data.get('sourceInfo')).toBe('FRIENDS_FAMILY')
    expect(data.get('agreeTerms')).toBe('true')
    expect(data.get('confirmParticipation')).toBe('true')
  })

  it('sends the leader without identity (it comes from the session) and two members', () => {
    const data = buildRegistrationFormData(baseForm())

    const leaderInfo = JSON.parse(String(data.get('leaderInfo')))
    expect(leaderInfo).toEqual({
      whatsapp: '+6281234516789',
      institution: 'Universitas Indonesia - Management',
      yearOfStudy: '2nd year',
    })

    const members = JSON.parse(String(data.get('members')))
    expect(members).toHaveLength(2)
    expect(members[0]).toEqual({
      fullName: 'Person 2',
      email: 'p2@example.com',
      whatsapp: '+6281234516789',
      institution: 'Universitas Indonesia - Management',
      yearOfStudy: '2nd year',
    })
  })

  it('attaches the five proofs under the multer field names', () => {
    const data = buildRegistrationFormData(baseForm())

    for (const field of [
      'ktm_file',
      'follow_proof',
      'twibbon_proof',
      'poster_proof',
      'broadcast_proof',
    ]) {
      expect(data.get(field)).toBeInstanceOf(File)
    }
  })
})
