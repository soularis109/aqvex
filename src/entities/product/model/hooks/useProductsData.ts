import { useEffect, useState } from 'react'
import type { PaginatedProducts } from '../types'
import { PRODUCTS_URL, mapDtoToProducts } from '@shared/api'
import type { ProductsApiResponse } from '@shared/api'

type UseProductsDataResult = {
  loading: boolean
  error: string | null
  data: PaginatedProducts | null
}

export function useProductsData(): UseProductsDataResult {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<PaginatedProducts | null>(null)

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(PRODUCTS_URL, {
          method: 'GET',
        })

        if (!res.ok) {
          throw new Error('Не вдалося завантажити товари')
        }

        const json = (await res.json()) as ProductsApiResponse
        if (!isActive) return

        const items = mapDtoToProducts(json)
        const normalized: PaginatedProducts = {
          items,
          total: items.length,
          page: 1,
          pageSize: items.length,
        }

        setData(normalized)
      } catch (err: unknown) {
        if (!isActive) return
        setError(
          err instanceof Error ? err.message : 'Не вдалося завантажити товари',
        )
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  return {
    loading,
    error,
    data,
  }
}
