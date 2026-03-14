export type ProductVolumeId = string

export interface ProductVolume {
  id: ProductVolumeId
  label: string
  in_stock: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  image: string
  price: number
  old_price: number
  discount_percent: number
  currency: string
  rating: number
  reviews_count: number
  in_stock: boolean
  category: string
  volumes: ProductVolume[]
  selected_volume_id: ProductVolumeId
}

export interface ProductsApiResponse {
  success: boolean
  data: {
    products: Product[]
  }
}

export type SortOption = 'popular' | 'price_asc' | 'price_desc' | 'discount'

export interface GetProductsParams {
  search?: string
  sortBy?: SortOption
  page?: number
  pageSize?: number
}

export interface PaginatedProducts {
  items: Product[]
  total: number
  page: number
  pageSize: number
}
