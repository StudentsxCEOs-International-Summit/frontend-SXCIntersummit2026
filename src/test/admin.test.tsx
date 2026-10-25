import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import RequireStaff from '@/components/RequireStaff'
import { isPendingFile, submissionLabel } from '@/services/admin'

const me = (user: object | null) =>
  vi.stubGlobal(
    'fetch',
    vi.fn(async () =>
      user
        ? new Response(JSON.stringify({ success: true, message: 'ok', data: { user } }), { status: 200 })
        : new Response(JSON.stringify({ success: false, message: 'no' }), { status: 401 }),
    ),
  )

const renderGuard = () =>
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<p>staff login</p>} />
          <Route
            path="/admin"
            element={
              <RequireStaff>
                <p>console</p>
              </RequireStaff>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  )

afterEach(() => vi.unstubAllGlobals())

describe('admin guard', () => {
  it('lets a staff session in', async () => {
    me({ id: 1, email: 'a@b.c', name: 'A', accountType: 'staff' })
    renderGuard()
    expect(await screen.findByText('console')).toBeInTheDocument()
  })

  it('sends a participant to the staff login', async () => {
    me({ id: 2, email: 'p@b.c', name: 'P', accountType: 'user' })
    renderGuard()
    expect(await screen.findByText('staff login')).toBeInTheDocument()
  })

  it('sends a signed-out visitor to the staff login', async () => {
    me(null)
    renderGuard()
    expect(await screen.findByText('staff login')).toBeInTheDocument()
  })
})

describe('admin helpers', () => {
  it('treats files without a Drive id and a pending path as processing', () => {
    const file = { id: 1, fileType: null, fileSize: 1, uploadedAt: '', gdriveId: null }
    expect(isPendingFile({ ...file, filePath: 'pending:abc.png' })).toBe(true)
    expect(isPendingFile({ ...file, filePath: 'https://drive.google.com/x', gdriveId: 'x' })).toBe(false)
  })

  it('labels submissions, including older event spellings', () => {
    const base = { id: 1, stage: 'REGISTRATION' as const, type: 'PROMOTION' as const, submittedAt: '', Files: [] }
    expect(submissionLabel({ ...base, event: 'IBCC-requirement-twibbon' })).toBe('Twibbon proof')
    expect(submissionLabel({ ...base, type: 'PAYMENT' as const, event: 'IBCC' })).toBe('Payment proof')
  })
})
