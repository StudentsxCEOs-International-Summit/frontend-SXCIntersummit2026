import {
  buildRegistrationFormData,
  findEarliestErrorStep,
  formatRegistrationError,
  isValidWhatsappNumber,
  normalizeWhatsappNumber,
} from '@/utils/ibccRegistrationPayload'
import type { IbccRegistrationForm, ParticipantInformation } from '@/types/ibccRegistration'

// These expectations mirror back-end/src/features/ibcc/ibcc.schema.ts and storage.service.ts.

const person = (n: number): ParticipantInformation => ({
  fullName: `Person ${n}`,
  email: `p${n}@example.com`,
  whatsapp: '+6281234516789',
  institution: 'Universitas Indonesia',
  major: 'Management',
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

  it('sends the editable leader name and details, plus two members', () => {
    const data = buildRegistrationFormData(baseForm())

    const leaderInfo = JSON.parse(String(data.get('leaderInfo')))
    expect(leaderInfo).toEqual({
      fullName: 'Person 1',
      whatsapp: '+6281234516789',
      institution: 'Universitas Indonesia',
      major: 'Management',
      yearOfStudy: '2nd year',
    })

    const members = JSON.parse(String(data.get('members')))
    expect(members).toHaveLength(2)
    expect(members[0]).toEqual({
      fullName: 'Person 2',
      email: 'p2@example.com',
      whatsapp: '+6281234516789',
      institution: 'Universitas Indonesia',
      major: 'Management',
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

  it('strips invisible Unicode marks and formatting from WhatsApp numbers in payload', () => {
    const form = baseForm()
    form.leader.whatsapp = '\u200E+62 822-6685-9292'
    form.secondMember.whatsapp = '\u202A0812-1234-4182\u202C'

    const data = buildRegistrationFormData(form)
    const leaderInfo = JSON.parse(String(data.get('leaderInfo')))
    const members = JSON.parse(String(data.get('members')))

    expect(leaderInfo.whatsapp).toBe('+6282266859292')
    expect(members[1].whatsapp).toBe('081212344182')
  })
})

describe('registration phone validation, error formatting, and step jump helpers', () => {
  it('validates Indonesian and international WhatsApp formats with invisible chars stripped', () => {
    expect(normalizeWhatsappNumber('+6281212344182\u200E')).toBe('+6281212344182')
    expect(normalizeWhatsappNumber('\u2066+6281212344182\u2069')).toBe('+6281212344182')
    expect(isValidWhatsappNumber('\u202A081212344182\u202C')).toBe(true)
    expect(isValidWhatsappNumber('+6281212344182\u200E')).toBe(true)
    expect(isValidWhatsappNumber('12345')).toBe(false)
    expect(isValidWhatsappNumber('')).toBe(false)
  })

  it('formats raw backend error paths into user-friendly labels', () => {
    expect(
      formatRegistrationError(
        'members[1].whatsapp: Please enter a valid WhatsApp number (e.g. 08123456789 or +628123456789)',
      ),
    ).toBe(
      'Member 2 WhatsApp Number: Please enter a valid WhatsApp number (e.g. 08123456789 or +628123456789)',
    )
    expect(formatRegistrationError('leaderInfo.institution: Institution is required')).toBe(
      'Team Leader Institution: Institution is required',
    )
  })

  it('resolves the earliest wizard step containing a field error', () => {
    expect(findEarliestErrorStep(['secondMember.whatsapp', 'firstMember.email'])).toBe(3)
    expect(findEarliestErrorStep(['secondMember.whatsapp'])).toBe(4)
    expect(findEarliestErrorStep(['leader.whatsapp', 'teamName'])).toBe(1)
    expect(findEarliestErrorStep(['unknownField'])).toBeNull()
  })
})
