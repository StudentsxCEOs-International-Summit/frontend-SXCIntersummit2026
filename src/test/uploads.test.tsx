import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MyTeamPage from '@/pages/user/MyTeamPage'
import { ibccService, type MyTeam } from '@/services/ibcc'

const reply = (status: number, message: string, data?: unknown) =>
  new Response(JSON.stringify({ success: status < 400, message, data }), { status })

const team = (overrides: Partial<MyTeam> = {}): MyTeam => ({
  id: 5,
  name: 'Team Alpha',
  code: 'A-001',
  status: 'REGISTERED',
  isLeader: true,
  competitionStage: 'REGISTRATION',
  payment: { status: 'NOT_SUBMITTED', isUploaded: false, fileUrl: null, submittedAt: null },
  selectionResult: { isAnnounced: false, isQualified: false, announcementMessage: null },
  leader: { id: 1, name: 'Lead', email: 'lead@example.com', institution: 'UI' },
  members: [],
  submissions: {
    requirementsCompleted: true,
    paymentSubmitted: false,
    paymentSubmittedAt: null,
    preliminaryOutputSubmitted: false,
    preliminarySubmittedAt: null,
  },
  ...overrides,
})

const renderWith = (myTeam: MyTeam) => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => reply(200, 'ok', myTeam)),
  )
  return render(
    <MemoryRouter>
      <MyTeamPage />
    </MemoryRouter>,
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('My Team submissions', () => {
  it('offers payment and preliminary uploads to the leader', async () => {
    renderWith(team())

    expect(await screen.findByRole('heading', { name: 'Payment proof' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Preliminary slide deck' })).toBeInTheDocument()
    // Semifinal only opens once the team is qualified.
    expect(screen.queryByRole('heading', { name: 'Semifinal slide deck' })).not.toBeInTheDocument()
  })

  it('opens the semifinal upload for a qualified team and hides finished ones', async () => {
    renderWith(
      team({
        selectionResult: { isAnnounced: true, isQualified: true, announcementMessage: 'Congrats' },
        payment: { status: 'PAID', isUploaded: true, fileUrl: null, submittedAt: null },
        submissions: {
          requirementsCompleted: true,
          paymentSubmitted: true,
          paymentSubmittedAt: null,
          preliminaryOutputSubmitted: true,
          preliminarySubmittedAt: null,
        },
      }),
    )

    expect(await screen.findByRole('heading', { name: 'Semifinal slide deck' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Payment proof' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Preliminary slide deck' })).not.toBeInTheDocument()
  })

  it('tells members that only the leader can upload', async () => {
    renderWith(team({ isLeader: false }))

    expect(await screen.findByText(/Only the team leader can upload/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Payment proof' })).not.toBeInTheDocument()
  })

  it('rejects a payment proof that is not an image before sending anything', async () => {
    const { container } = renderWith(team())
    await screen.findByRole('heading', { name: 'Payment proof' })

    const input = container.querySelector('input[type=file]') as HTMLInputElement
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'proof.pdf', { type: 'application/pdf' })] },
    })

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/Only JPG, JPEG, PNG/))
  })
})

describe('upload requests', () => {
  it('send the file under the field name `file` (what multer expects) plus teamId', async () => {
    const fetchMock = vi.fn(async () => reply(201, 'ok', {}))
    vi.stubGlobal('fetch', fetchMock)

    const file = new File(['x'], 'proof.png', { type: 'image/png' })
    await ibccService.submitPayment(file, 5)
    await ibccService.submitPreliminary(file, 5)
    await ibccService.submitSemifinal(file, 5)

    const calls = fetchMock.mock.calls as unknown as [string, RequestInit][]
    expect(calls.map(([url]) => url.replace(/^https?:\/\/[^/]+\/api/, ''))).toEqual([
      '/ibcc/submission/payment',
      '/ibcc/submission/preliminary',
      '/ibcc/submission/semifinal',
    ])
    for (const [, init] of calls) {
      const body = init.body as FormData
      expect(body.get('file')).toBeInstanceOf(File)
      expect(body.get('teamId')).toBe('5')
      expect(init.credentials).toBe('include')
    }
  })
})
