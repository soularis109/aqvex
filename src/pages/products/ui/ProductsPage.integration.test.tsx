import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductsPage from './ProductsPage'
import type { Product } from '@entities/product'

const mockUseProducts = vi.fn()

vi.mock('@entities/product', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@entities/product')>()
  return {
    ...actual,
    useProducts: () => mockUseProducts(),
  }
})

vi.mock('@shared/hooks', () => ({
  useScrollToTopOnChange: () => {},
}))

const createProduct = (overrides: Partial<Product> = {}): Product => ({
  id: '1',
  slug: 'test-product',
  name: 'Integration Test Product',
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

describe('ProductsPage (integration)', () => {
  beforeEach(() => {
    mockUseProducts.mockReturnValue({
      products: [createProduct()],
      total: 1,
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 5,
      search: '',
      sortBy: 'popular',
      setSearch: vi.fn(),
      setSortBy: vi.fn(),
      setPage: vi.fn(),
    })
  })

  it('renders real CatalogResultsGrid with ProductCard when products are loaded', () => {
    render(<ProductsPage />)

    expect(screen.getByTestId('product-grid')).toBeInTheDocument()
    expect(screen.getByText('Integration Test Product')).toBeInTheDocument()
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument()
  })

  it('renders CatalogResultsSummary with pluralized total', () => {
    mockUseProducts.mockReturnValue({
      products: [createProduct()],
      total: 1,
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 5,
      search: '',
      sortBy: 'popular',
      setSearch: vi.fn(),
      setSortBy: vi.fn(),
      setPage: vi.fn(),
    })

    render(<ProductsPage />)

    expect(screen.getByText('1 товар')).toBeInTheDocument()
  })

  it('renders empty state when no products match search', () => {
    mockUseProducts.mockReturnValue({
      products: [],
      total: 0,
      loading: false,
      error: null,
      currentPage: 1,
      pageSize: 5,
      search: 'nonexistent',
      sortBy: 'popular',
      setSearch: vi.fn(),
      setSortBy: vi.fn(),
      setPage: vi.fn(),
    })

    render(<ProductsPage />)

    expect(screen.getByTestId('product-grid-empty')).toBeInTheDocument()
    expect(
      screen.getByText('По вашому запиту нічого не знайдено.'),
    ).toBeInTheDocument()
  })
})
