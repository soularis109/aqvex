import type { Product } from '@entities/product'
import { ProductCard, ProductCardSkeleton } from '@entities/product'

interface CatalogResultsGridProps {
  products: Product[]
  loading: boolean
}

export function CatalogResultsGrid({
  products,
  loading,
}: CatalogResultsGridProps) {
  if (loading && products.length === 0) {
    return (
      <div
        data-testid="product-grid-loading"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div
        data-testid="product-grid-empty"
        className="rounded-3xl bg-white p-10 text-center text-sm text-aqxTextSecondary shadow-card"
      >
        По вашому запиту нічого не знайдено.
      </div>
    )
  }

  return (
    <div
      data-testid="product-grid"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
