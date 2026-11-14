import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

const reply = (status: number, data?: unknown) =>
  new Response(JSON.stringify({ success: status < 400, message: 'ok', data }), { status })

beforeEach(() => {
  window.history.replaceState({}, '', '/')
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => reply(401)),
  )
})

afterEach(() => {
  window.history.replaceState({}, '', '/')
  vi.unstubAllGlobals()
})

describe('Google OAuth login', () => {
  const renderLogin = (from: string) =>
    render(
      <MemoryRouter initialEntries={[{ pathname: '/login', state: { from } }]}>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    )

  it('starts OAuth through the backend and preserves the internal return path', async () => {
    renderLogin('/team-register?step=verify')

    const link = await screen.findByRole('link', { name: 'Continue with Google' })
    const authUrl = new URL(link.getAttribute('href')!)
    const returnUrl = new URL(authUrl.searchParams.get('state')!)

    expect(authUrl.pathname).toBe('/api/auth/google')
    expect(returnUrl.origin).toBe(window.location.origin)
    expect(returnUrl.pathname).toBe('/team-register')
    expect(returnUrl.search).toBe('?step=verify')
  })

  it('does not pass an external return URL to the OAuth callback', async () => {
    renderLogin('https://example.com')

    const link = await screen.findByRole('link', { name: 'Continue with Google' })
    const authUrl = new URL(link.getAttribute('href')!)
    const returnUrl = new URL(authUrl.searchParams.get('state')!)

    expect(returnUrl.origin).toBe(window.location.origin)
    expect(returnUrl.pathname).toBe('/')
  })

  it('starts Google OAuth from registration and returns to team registration', async () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AuthProvider>
          <RegisterPage />
        </AuthProvider>
      </MemoryRouter>,
    )

    const link = await screen.findByRole('link', { name: 'Continue with Google' })
    const authUrl = new URL(link.getAttribute('href')!)
    const returnUrl = new URL(authUrl.searchParams.get('state')!)

    expect(authUrl.pathname).toBe('/api/auth/google')
    expect(returnUrl.origin).toBe(window.location.origin)
    expect(returnUrl.pathname).toBe('/team-register')
  })

  it('removes the callback token from the URL before restoring the session', async () => {
    window.history.replaceState({}, '', '/?token=oauth-token&keep=yes#section')
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        reply(200, {
          user: { id: 1, name: 'Participant', email: 'participant@example.com' },
        }),
      ),
    )

    render(
      <AuthProvider>
        <p>Restoring session</p>
      </AuthProvider>,
    )

    await waitFor(() => expect(window.location.search).toBe('?keep=yes'))
    expect(window.location.hash).toBe('#section')
  })
})
