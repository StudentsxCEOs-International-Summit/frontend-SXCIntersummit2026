import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '@/Pages/HomePage'
import AppRoutes from '@/routes'
import NavigationBar from '@/Components/navigationbar'

describe('HomePage', () => {
  it('renders the home page heading', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Home Page' })).toBeInTheDocument()
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

describe('NavigationBar', () => {
  it('renders logo image and navigation items', () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: 'image' })).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Program')).toBeInTheDocument()
    expect(screen.getByText('Merchandise')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Sign In' })[0]).toBeInTheDocument()
  })
})

