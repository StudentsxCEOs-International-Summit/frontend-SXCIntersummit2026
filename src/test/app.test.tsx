import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '@/pages/HomepageTemp'
import AppRoutes from '@/routes'
import NavigationBar from '@/components/NavigationBar'
import { AuthProvider } from '@/context/AuthContext'

// The app asks the backend who is signed in on load; answer "signed out" without a network.
beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), { status: 401 })),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('HomePage', () => {
  it('renders the landing page sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'StudentsxCEOsInternational Summit 2026',
    )
    for (const title of ['Timeline IBCC', 'Events', 'Frequently Asked Questions']) {
      expect(screen.getByRole('heading', { name: title, level: 2 })).toBeInTheDocument()
    }
    // Competitions are part of Events, so they sit under it as a sub-heading.
    expect(screen.getByRole('heading', { name: 'Competitions', level: 3 })).toBeInTheDocument()
  })

  it('toggles FAQ answers', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    const question = screen.getByRole('button', { name: /How can I register/ })
    expect(question).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(question)
    expect(question).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders the not-found page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})

describe('NavigationBar', () => {
  it('renders logo image and navigation items', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <NavigationBar />
        </AuthProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: 'SxC International Summit' })).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('IBCC')).toBeInTheDocument()
    expect(screen.getByText('Merchandise')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Sign In' })[0]).toBeInTheDocument()
  })
})
