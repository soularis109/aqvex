import type { PaginatedProducts, SortOption } from '@shared/api/product/types'

export interface UseProductsState {
  loading: boolean
  error: string | null
  data: PaginatedProducts | null
  products: PaginatedProducts['items']
  total: number
  currentPage: number
  pageSize: number
  search: string
  sortBy: SortOption
}

export interface UseProductsControls {
  setSearch: (value: string) => void
  setSortBy: (value: SortOption) => void
  setPage: (page: number) => void
}

export type UseProductsResult = UseProductsState & UseProductsControls
