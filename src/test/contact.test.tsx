import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ContactPage from '@/pages/ContactPage'

const reply = (status: number, message: string, errors?: unknown) =>
  new Response(JSON.stringify({ success: status < 400, message, data: null, errors }), { status })

const renderPage = () =>
  render(
    <MemoryRouter>
      <ContactPage />
    </MemoryRouter>,
  )

const fill = () => {
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Rina Putri' } })
  fireEvent.change(screen.getByLabelText(/Organization/), { target: { value: 'Acme Media' } })
  fireEvent.change(screen.getByLabelText(/Your email/), { target: { value: 'rina@acme.com' } })
  fireEvent.change(screen.getByLabelText(/Message/), { target: { value: 'We would love to be a media partner.' } })
}

afterEach(() => vi.unstubAllGlobals())

describe('Contact page', () => {
  it('stores the enquiry through POST /contact and says thank you', async () => {
    const fetchMock = vi.fn(async () => reply(201, 'Thank you!'))
    vi.stubGlobal('fetch', fetchMock)
    renderPage()
    fill()
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    expect(await screen.findByText(/We received your message/)).toBeInTheDocument()
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toMatch(/\/contact$/)
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body as string)).toMatchObject({
      name: 'Rina Putri',
      organization: 'Acme Media',
      email: 'rina@acme.com',
      type: 'Sponsorship',
      website: '',
    })
  })

  it('shows the server validation messages next to the fields', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        reply(400, 'Validation error', [{ path: ['email'], message: 'Invalid email address' }]),
      ),
    )
    renderPage()
    fill()
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(screen.getByText('Invalid email address')).toBeInTheDocument())
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled()
  })
})
