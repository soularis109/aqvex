import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductsPage from './ProductsPage'

const mockUseProducts = vi.fn()

vi.mock('@entities/product', () => ({
  useProducts: () => mockUseProducts(),
}))

vi.mock('@widgets/catalogResultsGrid', () => ({
  CatalogResultsGrid: ({
    products,
    loading,
  }: {
    products: { id: string; name: string }[]
    loading: boolean
  }) => (
    <div data-testid="product-grid">
      {loading && <span>Loading</span>}
      {products.map((p) => (
        <span key={p.id}>{p.name}</span>
      ))}
    </div>
  ),
}))

vi.mock('@shared/hooks', () => ({
  useScrollToTopOnChange: () => {},
}))

describe('ProductsPage', () => {
  beforeEach(() => {
    mockUseProducts.mockReturnValue({
      products: [],
      total: 0,
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

  it('renders page layout with search section', () => {
    render(<ProductsPage />)
    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  it('renders product grid', () => {
    render(<ProductsPage />)
    expect(screen.getByTestId('product-grid')).toBeInTheDocument()
  })

  it('renders products when data is loaded', () => {
    mockUseProducts.mockReturnValue({
      products: [{ id: '1', name: 'Product 1' }],
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
    expect(screen.getByText('Product 1')).toBeInTheDocument()
  })
})
