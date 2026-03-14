import type { Product, ProductsApiResponse } from './types'

export type ProductDto = Product

export function mapDtoToProducts(response: ProductsApiResponse): Product[] {
  return response.data.products
}
