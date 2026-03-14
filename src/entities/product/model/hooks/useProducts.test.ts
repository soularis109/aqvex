import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useProducts } from './useProducts'

const createProduct = (overrides: Record<string, unknown> = {}) => ({
  id: '1',
  slug: 'slug',
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

const mockItems = [
  createProduct({
    id: '1',
    name: 'iPhone',
    price: 100,
    rating: 5,
    reviews_count: 10,
  }),
  createProduct({
    id: '2',
    name: 'Samsung',
    price: 200,
    rating: 4,
    reviews_count: 5,
  }),
  createProduct({
    id: '3',
    name: 'iPhone Case',
    price: 50,
    rating: 3,
    reviews_count: 2,
  }),
  createProduct({
    id: '4',
    name: 'Laptop',
    price: 500,
    rating: 5,
    reviews_count: 20,
  }),
]

const mockUseProductsData = vi.fn()

vi.mock('./useProductsData', () => ({
  useProductsData: () => mockUseProductsData(),
}))

describe('useProducts', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockUseProductsData.mockReturnValue({
      loading: false,
      error: null,
      data: {
        items: mockItems,
        total: mockItems.length,
        page: 1,
        pageSize: mockItems.length,
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.search).toBe('')
    expect(result.current.sortBy).toBe('popular')
    expect(result.current.currentPage).toBe(1)
    expect(result.current.products).toHaveLength(4)
  })

  it('filters products by search', () => {
    const { result } = renderHook(() => useProducts())

    act(() => {
      result.current.setSearch('iphone')
    })

    expect(result.current.search).toBe('iphone')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current.products).toHaveLength(2)
    expect(result.current.products.map((p) => p.name)).toContain('iPhone')
    expect(result.current.products.map((p) => p.name)).toContain('iPhone Case')
  })

  it('sorts products by price_asc', () => {
    const { result } = renderHook(() => useProducts())

    act(() => {
      result.current.setSortBy('price_asc')
    })

    expect(result.current.products[0].price).toBe(50)
    expect(result.current.products[1].price).toBe(100)
  })

  it('paginates products', () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.pageSize).toBe(5)
    expect(result.current.products).toHaveLength(4)

    act(() => {
      result.current.setPage(2)
    })

    expect(result.current.currentPage).toBe(2)
  })

  it('resets page when search changes', () => {
    const { result } = renderHook(() => useProducts())

    act(() => {
      result.current.setPage(2)
    })
    expect(result.current.currentPage).toBe(2)

    act(() => {
      result.current.setSearch('test')
    })
    expect(result.current.currentPage).toBe(1)
  })
})
