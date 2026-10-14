import { render, screen } from '@testing-library/react'
import {
  BlueColorFilter,
  BlueColorFilterDefs,
  BLUE_COLOR_FILTER_ID,
} from '@/components/BlueColorFilter'
import Building from '@/assets/images/img-building.jpg'

describe('BlueColorFilter', () => {
  it('renders image with duotone SVG filter applied via inline style', () => {
    const { container } = render(<BlueColorFilter img={Building} alt="Building test" />)

    const img = screen.getByRole('img', { name: 'Building test' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', Building)
    expect(img.style.filter).toContain(BLUE_COLOR_FILTER_ID)

    // Verify SVG filter element exists
    const filter = container.querySelector(`filter#${BLUE_COLOR_FILTER_ID}`)
    expect(filter).toBeInTheDocument()
    expect(filter?.querySelector('feColorMatrix')).toBeInTheDocument()
    expect(filter?.querySelector('feComponentTransfer')).toBeInTheDocument()
  })

  it('supports custom filterId and matches both the definition and image filter URL', () => {
    const customId = 'custom-summit-blue'
    const { container } = render(<BlueColorFilter img={Building} filterId={customId} />)

    const img = screen.getByRole('img')
    expect(img.style.filter).toContain(customId)

    const filter = container.querySelector(`filter#${customId}`)
    expect(filter).toBeInTheDocument()
  })

  it('renders children layered on top of the background', () => {
    render(
      <BlueColorFilter img={Building}>
        <div data-testid="hero-content">
          <h1>SxC Summit 2026</h1>
        </div>
      </BlueColorFilter>,
    )

    expect(screen.getByTestId('hero-content')).toBeInTheDocument()
    expect(screen.getByText('SxC Summit 2026')).toBeInTheDocument()
  })

  it('renders atmospheric light overlay gradients by default', () => {
    const { container } = render(<BlueColorFilter img={Building} />)

    const topBloom = container.querySelector(`radialGradient#${BLUE_COLOR_FILTER_ID}-top-bloom`)
    expect(topBloom).toBeInTheDocument()
  })

  it('allows disabling atmospheric lighting if desired', () => {
    const { container } = render(<BlueColorFilter img={Building} atmosphericLight={false} />)

    // With atmosphericLight false, the atmospheric rects are omitted
    const bloomRect = container.querySelector('rect[fill*="top-bloom"]')
    expect(bloomRect).toBeNull()
  })

  it('supports standalone BlueColorFilterDefs for global CSS usage', () => {
    const { container } = render(<BlueColorFilterDefs id="global-blue" />)

    const filter = container.querySelector('filter#global-blue')
    expect(filter).toBeInTheDocument()
    expect(filter?.querySelector('feComponentTransfer')).toBeInTheDocument()
  })

  it('supports defsOnly prop to only render definitions', () => {
    const { container } = render(<BlueColorFilter defsOnly filterId="defs-test" />)

    expect(container.querySelector('filter#defs-test')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })

  it('accepts custom palette and generates proper tableValues', () => {
    const { container } = render(
      <BlueColorFilter
        filterId="palette-test"
        palette={{
          shadow: '#010b2b',
          midDark: '#031c6a',
          midtone: '#1a5fd0',
          bright: '#5e9aff',
          highlight: '#ffffff',
        }}
      />,
    )

    const filter = container.querySelector('filter#palette-test')
    const compTransfer = filter?.querySelectorAll('feComponentTransfer')[1]
    const funcB = compTransfer?.querySelector('feFuncB')
    expect(funcB).toHaveAttribute('tableValues')
  })
})
