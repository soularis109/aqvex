import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CatalogResultsGrid } from './CatalogResultsGrid'
import type { Product } from '@entities/product'

const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  slug: 'test-product',
  name: 'Test Product',
  image: '',
  price: 100,
  old_price: 150,
  discount_percent: 33,
  currency: 'UAH',
  rating: 4.5,
  reviews_count: 10,
  in_stock: true,
  category: 'Electronics',
  volumes: [],
  selected_volume_id: '',
  ...overrides,
})

describe('CatalogResultsGrid', () => {
  it('renders loading skeletons when loading and no products', () => {
    render(<CatalogResultsGrid products={[]} loading={true} />)

    expect(screen.getByTestId('product-grid-loading')).toBeInTheDocument()
    expect(screen.queryByTestId('product-grid-empty')).not.toBeInTheDocument()
  })

  it('renders empty state when not loading and no products', () => {
    render(<CatalogResultsGrid products={[]} loading={false} />)

    expect(screen.getByTestId('product-grid-empty')).toBeInTheDocument()
    expect(
      screen.getByText('По вашому запиту нічого не знайдено.'),
    ).toBeInTheDocument()
  })

  it('renders product cards when products exist', () => {
    const products = [
      createProduct({ id: '1', name: 'Product One' }),
      createProduct({ id: '2', name: 'Product Two' }),
    ]

    render(<CatalogResultsGrid products={products} loading={false} />)

    expect(screen.getByTestId('product-grid')).toBeInTheDocument()
    expect(screen.getByText('Product One')).toBeInTheDocument()
    expect(screen.getByText('Product Two')).toBeInTheDocument()
  })

  it('renders products when loading but products already exist', () => {
    const products = [createProduct({ id: '1', name: 'Existing Product' })]

    render(<CatalogResultsGrid products={products} loading={true} />)

    expect(screen.getByTestId('product-grid')).toBeInTheDocument()
    expect(screen.getByText('Existing Product')).toBeInTheDocument()
  })
})
