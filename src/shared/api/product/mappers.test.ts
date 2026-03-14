import { describe, it, expect } from 'vitest'
import { mapDtoToProducts } from './mappers'
import type { ProductsApiResponse } from './types'

describe('mapDtoToProducts', () => {
  it('extracts products from API response', () => {
    const response: ProductsApiResponse = {
      success: true,
      data: {
        products: [
          {
            id: '1',
            slug: 'prod-1',
            name: 'Product 1',
            image: 'img1.jpg',
            price: 100,
            old_price: 150,
            discount_percent: 33,
            currency: 'UAH',
            rating: 4.5,
            reviews_count: 10,
            in_stock: true,
            category: 'Category',
            volumes: [],
            selected_volume_id: '',
          },
        ],
      },
    }

    const result = mapDtoToProducts(response)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(response.data.products[0])
  })

  it('returns empty array when response has no products', () => {
    const response: ProductsApiResponse = {
      success: true,
      data: { products: [] },
    }

    const result = mapDtoToProducts(response)

    expect(result).toEqual([])
  })

  it('returns all products from response', () => {
    const products = [
      {
        id: '1',
        slug: 'p1',
        name: 'P1',
        image: '',
        price: 1,
        old_price: 2,
        discount_percent: 0,
        currency: 'UAH',
        rating: 5,
        reviews_count: 0,
        in_stock: true,
        category: 'C',
        volumes: [],
        selected_volume_id: '',
      },
      {
        id: '2',
        slug: 'p2',
        name: 'P2',
        image: '',
        price: 2,
        old_price: 3,
        discount_percent: 0,
        currency: 'UAH',
        rating: 4,
        reviews_count: 1,
        in_stock: true,
        category: 'C',
        volumes: [],
        selected_volume_id: '',
      },
    ]
    const response: ProductsApiResponse = {
      success: true,
      data: { products },
    }

    const result = mapDtoToProducts(response)

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('2')
  })

  it('returns products when success is false (mapper ignores success flag)', () => {
    const response: ProductsApiResponse = {
      success: false,
      data: {
        products: [
          {
            id: '1',
            slug: 'p1',
            name: 'Product',
            image: '',
            price: 100,
            old_price: 150,
            discount_percent: 0,
            currency: 'UAH',
            rating: 5,
            reviews_count: 0,
            in_stock: true,
            category: 'C',
            volumes: [],
            selected_volume_id: '',
          },
        ],
      },
    }

    const result = mapDtoToProducts(response)

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Product')
  })
})
