import { describe, it, expect } from 'vitest'
import { getProductsView } from './productSelectors'
import type { Product } from '../types'

const createProduct = (overrides: Partial<Product> = {}): Product => ({
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

describe('getProductsView', () => {
  const baseParams = {
    items: [] as Product[],
    search: '',
    sortBy: 'popular' as const,
    page: 1,
    pageSize: 3,
  }

  describe('pagination', () => {
    it('returns first page of items', () => {
      const items = Array.from({ length: 5 }, (_, i) =>
        createProduct({ id: String(i), name: `Product ${i}` }),
      )

      const result = getProductsView({
        ...baseParams,
        items,
        page: 1,
        pageSize: 2,
      })

      expect(result.products).toHaveLength(2)
      expect(result.products[0].id).toBe('0')
      expect(result.products[1].id).toBe('1')
      expect(result.total).toBe(5)
    })

    it('returns second page of items', () => {
      const items = Array.from({ length: 5 }, (_, i) =>
        createProduct({ id: String(i), name: `Product ${i}` }),
      )

      const result = getProductsView({
        ...baseParams,
        items,
        page: 2,
        pageSize: 2,
      })

      expect(result.products).toHaveLength(2)
      expect(result.products[0].id).toBe('2')
      expect(result.products[1].id).toBe('3')
      expect(result.total).toBe(5)
    })

    it('returns empty products when page exceeds items', () => {
      const items = [createProduct()]

      const result = getProductsView({
        ...baseParams,
        items,
        page: 2,
        pageSize: 10,
      })

      expect(result.products).toEqual([])
      expect(result.total).toBe(1)
    })
  })

  describe('search', () => {
    it('filters by product name', () => {
      const items = [
        createProduct({ id: '1', name: 'iPhone' }),
        createProduct({ id: '2', name: 'Samsung' }),
        createProduct({ id: '3', name: 'iPhone Case' }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        search: 'iphone',
      })

      expect(result.products).toHaveLength(2)
      expect(result.products.map((p) => p.name)).toContain('iPhone')
      expect(result.products.map((p) => p.name)).toContain('iPhone Case')
      expect(result.total).toBe(2)
    })

    it('filters by category', () => {
      const items = [
        createProduct({ id: '1', category: 'Electronics' }),
        createProduct({ id: '2', category: 'Clothing' }),
        createProduct({ id: '3', category: 'Electronics' }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        search: 'electronics',
      })

      expect(result.products).toHaveLength(2)
      expect(result.total).toBe(2)
    })

    it('returns all items when search is empty', () => {
      const items = [createProduct(), createProduct({ id: '2' })]

      const result = getProductsView({
        ...baseParams,
        items,
        search: '',
      })

      expect(result.products).toHaveLength(2)
      expect(result.total).toBe(2)
    })

    it('returns empty when no matches', () => {
      const items = [createProduct({ name: 'iPhone' })]

      const result = getProductsView({
        ...baseParams,
        items,
        search: 'xyz',
      })

      expect(result.products).toEqual([])
      expect(result.total).toBe(0)
    })
  })

  describe('sort', () => {
    it('sorts by price_asc', () => {
      const items = [
        createProduct({ id: '1', price: 300 }),
        createProduct({ id: '2', price: 100 }),
        createProduct({ id: '3', price: 200 }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        sortBy: 'price_asc',
      })

      expect(result.products[0].price).toBe(100)
      expect(result.products[1].price).toBe(200)
      expect(result.products[2].price).toBe(300)
    })

    it('sorts by price_desc', () => {
      const items = [
        createProduct({ id: '1', price: 100 }),
        createProduct({ id: '2', price: 300 }),
        createProduct({ id: '3', price: 200 }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        sortBy: 'price_desc',
      })

      expect(result.products[0].price).toBe(300)
      expect(result.products[1].price).toBe(200)
      expect(result.products[2].price).toBe(100)
    })

    it('sorts by discount', () => {
      const items = [
        createProduct({ id: '1', discount_percent: 10 }),
        createProduct({ id: '2', discount_percent: 50 }),
        createProduct({ id: '3', discount_percent: 25 }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        sortBy: 'discount',
      })

      expect(result.products[0].discount_percent).toBe(50)
      expect(result.products[1].discount_percent).toBe(25)
      expect(result.products[2].discount_percent).toBe(10)
    })

    it('sorts by popular (rating, then reviews_count)', () => {
      const items = [
        createProduct({ id: '1', rating: 4, reviews_count: 5 }),
        createProduct({ id: '2', rating: 5, reviews_count: 2 }),
        createProduct({ id: '3', rating: 5, reviews_count: 10 }),
      ]

      const result = getProductsView({
        ...baseParams,
        items,
        sortBy: 'popular',
      })

      expect(result.products[0].id).toBe('3') // rating 5, reviews 10
      expect(result.products[1].id).toBe('2') // rating 5, reviews 2
      expect(result.products[2].id).toBe('1') // rating 4
    })
  })
})
