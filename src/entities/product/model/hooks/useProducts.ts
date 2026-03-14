import { useMemo, useState } from 'react'
import type { SortOption, UseProductsResult } from '../types'
import { PAGE_SIZE } from '../config'
import { useDebounce } from '@shared/hooks'
import { useProductsData } from './useProductsData'
import { getProductsView } from '../selectors'

const SEARCH_DEBOUNCE_MS = 300

export function useProducts(): UseProductsResult {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popular')
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS)

  const [page, setPage] = useState(1)
  const pageSize = PAGE_SIZE

  const { loading, error, data } = useProductsData()

  const { products, total } = useMemo(() => {
    const items = data?.items ?? []
    return getProductsView({
      items,
      search: debouncedSearch,
      sortBy,
      page,
      pageSize,
    })
  }, [data, debouncedSearch, sortBy, page, pageSize])

  const currentPage = page

  const handleSetSearch = (value: string) => {
    setPage(1)
    setSearch(value)
  }

  const handleSetSortBy = (value: SortOption) => {
    setPage(1)
    setSortBy(value)
  }

  const handleSetPage = (newPage: number) => {
    setPage(newPage)
  }

  return {
    loading,
    error,
    data,
    products,
    total,
    currentPage,
    pageSize,
    search,
    sortBy,
    setSearch: handleSetSearch,
    setSortBy: handleSetSortBy,
    setPage: handleSetPage,
  }
}
