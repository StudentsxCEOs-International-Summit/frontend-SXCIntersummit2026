import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import AppRoutes from '@/routes'

describe('HomePage', () => {
  it('renders the default Vite starter content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Get started' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeInTheDocument()
  })

  it('renders the not-found page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/missing-page']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
