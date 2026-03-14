import type { Product, SortOption } from '../types'

type ProductsViewParams = {
  items: Product[]
  search: string
  sortBy: SortOption
  page: number
  pageSize: number
}

type ProductsView = {
  products: Product[]
  total: number
}

export function getProductsView(params: ProductsViewParams): ProductsView {
  const { items, search, sortBy, page, pageSize } = params

  const filtered = applySearch(items, search)
  const sorted = applySort(filtered, sortBy)

  const total = sorted.length
  const start = (page - 1) * pageSize
  const end = start + pageSize

  const products = sorted.slice(start, end)

  return {
    products,
    total,
  }
}

function applySearch(items: Product[], search: string): Product[] {
  const query = search.trim().toLowerCase()
  if (!query) return items

  return items.filter((item) => {
    const name = item.name.toLowerCase()
    const category = item.category.toLowerCase()
    return name.includes(query) || category.includes(query)
  })
}

function applySort(items: Product[], sortBy: SortOption): Product[] {
  if (!items.length) return items

  const copy = [...items]

  switch (sortBy) {
    case 'price_asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price_desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'discount':
      return copy.sort((a, b) => b.discount_percent - a.discount_percent)
    case 'popular':
    default:
      return copy.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        return b.reviews_count - a.reviews_count
      })
  }
}
