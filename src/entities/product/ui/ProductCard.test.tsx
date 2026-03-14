import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import type { Product } from '../model/types'

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  name: 'Test Product Name',
  image: 'img.jpg',
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
}

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product Name')).toBeInTheDocument()
  })

  it('renders add to cart button', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument()
  })

  it('disables add to cart when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, in_stock: false }
    render(<ProductCard product={outOfStockProduct} />)
    const button = screen.getByTestId('add-to-cart-button')
    expect(button).toBeDisabled()
  })

  it('renders product price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/100/)).toBeInTheDocument()
  })
})
