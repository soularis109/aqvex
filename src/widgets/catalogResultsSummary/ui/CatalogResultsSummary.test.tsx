import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CatalogResultsSummary } from './CatalogResultsSummary'

describe('CatalogResultsSummary', () => {
  it('renders "1 товар" when total is 1', () => {
    render(<CatalogResultsSummary total={1} />)
    expect(screen.getByText('1 товар')).toBeInTheDocument()
  })

  it('renders "2 товара" when total is 2', () => {
    render(<CatalogResultsSummary total={2} />)
    expect(screen.getByText('2 товара')).toBeInTheDocument()
  })

  it('renders "5 товаров" when total is 5', () => {
    render(<CatalogResultsSummary total={5} />)
    expect(screen.getByText('5 товаров')).toBeInTheDocument()
  })

  it('renders "0 товаров" when total is 0', () => {
    render(<CatalogResultsSummary total={0} />)
    expect(screen.getByText('0 товаров')).toBeInTheDocument()
  })

  it('has aria-live polite for accessibility', () => {
    render(<CatalogResultsSummary total={1} />)
    expect(screen.getByText('1 товар')).toHaveAttribute('aria-live', 'polite')
  })
})
