import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApiError, apiRequest, setUnauthorizedHandler } from '@/lib/api'
import { AuthProvider } from '@/context/AuthContext'
import TeamRegistrationPage from '@/pages/user/TeamRegistrationPage'

/** Answers like the backend: { success, message, data } with the given HTTP status. */
const reply = (status: number, message: string, data?: unknown) =>
  new Response(JSON.stringify({ success: status < 400, message, data }), { status })

function stubBackend(routes: Record<string, () => Response>) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const path = String(url).replace(/^https?:\/\/[^/]+\/api/, '')
      const handler = routes[path]
      return handler ? handler() : reply(404, 'Not found')
    }),
  )
}

afterEach(() => {
  setUnauthorizedHandler(null)
  vi.unstubAllGlobals()
})

describe('401 handling', () => {
  it('tells the app when a protected call comes back unauthorized', async () => {
    stubBackend({ '/ibcc/my-team': () => reply(401, 'Invalid or expired token') })
    const onUnauthorized = vi.fn()
    setUnauthorizedHandler(onUnauthorized)

    await expect(apiRequest('/ibcc/my-team')).rejects.toBeInstanceOf(ApiError)
    expect(onUnauthorized).toHaveBeenCalledTimes(1)
  })

  it('ignores 401s from /auth/* (wrong password is an expected answer)', async () => {
    stubBackend({ '/auth/login': () => reply(401, 'Invalid email or password') })
    const onUnauthorized = vi.fn()
    setUnauthorizedHandler(onUnauthorized)

    await expect(apiRequest('/auth/login', { method: 'POST', body: {} })).rejects.toThrow(
      'Invalid email or password',
    )
    expect(onUnauthorized).not.toHaveBeenCalled()
  })
})

describe('team registration gate', () => {
  const renderPage = () =>
    render(
      <MemoryRouter initialEntries={['/team-register']}>
        <AuthProvider>
          <Routes>
            <Route path="/team-register" element={<TeamRegistrationPage />} />
            <Route path="/my-team" element={<p>My team page</p>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    )

  const authed = () =>
    reply(200, 'ok', { user: { id: 1, name: 'Lead', email: 'lead@example.com' } })

  it('shows "Registration Closed" when /config says registration is closed', async () => {
    stubBackend({
      '/auth/me': authed,
      '/ibcc/my-team': () => reply(404, 'No registered team found for this user.'),
      '/config': () =>
        reply(200, 'ok', { registrationOpen: false, deadline: '2026-12-31T16:59:59.000Z' }),
    })

    renderPage()

    expect(await screen.findByRole('heading', { name: 'Registration Closed' })).toBeInTheDocument()
  })

  it('sends someone who already has a team to My Team', async () => {
    stubBackend({
      '/auth/me': authed,
      '/ibcc/my-team': () => reply(200, 'ok', { id: 7, name: 'Existing Team' }),
      '/config': () => reply(200, 'ok', { registrationOpen: true, deadline: '2026-12-31T16:59:59.000Z' }),
    })

    renderPage()

    await waitFor(() => expect(screen.getByText('My team page')).toBeInTheDocument())
  })

  it('shows the form when registration is open and there is no team yet', async () => {
    stubBackend({
      '/auth/me': authed,
      '/ibcc/my-team': () => reply(404, 'No registered team found for this user.'),
      '/config': () => reply(200, 'ok', { registrationOpen: true, deadline: '2026-12-31T16:59:59.000Z' }),
    })

    renderPage()

    expect(await screen.findByRole('heading', { level: 1, name: /Team Registration/ })).toBeInTheDocument()
  })

  it('allows the leader name to be edited while keeping the account email locked', async () => {
    stubBackend({
      '/auth/me': authed,
      '/ibcc/my-team': () => reply(404, 'No registered team found for this user.'),
      '/config': () => reply(200, 'ok', { registrationOpen: true, deadline: '2026-12-31T16:59:59.000Z' }),
    })

    renderPage()

    await screen.findByRole('heading', { level: 1, name: /Team Registration/ })
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }))

    fireEvent.change(await screen.findByLabelText(/Team Name/), {
      target: { value: 'Alpha Team' },
    })
    fireEvent.click(screen.getByLabelText('Same University Students'))
    fireEvent.click(screen.getByLabelText('Instagram'))
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }))

    const fullName = await screen.findByLabelText(/Full Name/)
    const email = screen.getByLabelText(/Email/)
    expect(fullName).not.toHaveAttribute('readonly')
    expect(email).toHaveAttribute('readonly')
    expect(email).toHaveValue('lead@example.com')
    expect(
      screen.getByText(
        "This name will be saved to your SxC profile and won't affect your Google account.",
      ),
    ).toBeInTheDocument()

    fireEvent.change(fullName, { target: { value: 'Lead Full Name' } })
    expect(fullName).toHaveValue('Lead Full Name')
  })
})
