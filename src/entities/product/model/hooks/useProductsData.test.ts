import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProductsData } from './useProductsData'

const mockProductsResponse = {
  success: true,
  data: {
    products: [
      {
        id: '1',
        slug: 'p1',
        name: 'Product 1',
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
      },
    ],
  },
}

describe('useProductsData', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts with loading true', () => {
    fetchMock.mockImplementation(() => new Promise<Response>(() => {}))

    const { result } = renderHook(() => useProductsData())

    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(null)
    expect(result.current.data).toBe(null)
  })

  it('sets data on successful fetch', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockProductsResponse,
    })

    const { result } = renderHook(() => useProductsData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe(null)
    expect(result.current.data).not.toBe(null)
    expect(result.current.data?.items).toHaveLength(1)
    expect(result.current.data?.items[0].name).toBe('Product 1')
  })

  it('sets error on fetch failure', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
    })

    const { result } = renderHook(() => useProductsData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Не вдалося завантажити товари')
    expect(result.current.data).toBe(null)
  })

  it('sets error on network error', async () => {
    fetchMock.mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useProductsData())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.data).toBe(null)
  })
})
