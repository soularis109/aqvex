import type { Product } from '../model/types'

type ProductAvailabilityBadgeProps = {
  product: Product
}

export function ProductAvailabilityBadge({
  product,
}: ProductAvailabilityBadgeProps) {
  const isOutOfStock = !product.in_stock

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
      <span
        className={
          isOutOfStock
            ? 'inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-red-500'
            : 'inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-emerald-500'
        }
      >
        <span className="h-2 w-2 rounded-full bg-current" />
        {isOutOfStock ? 'Нет в наличии' : 'В наличии'}
      </span>

      <span className="inline-flex items-center gap-1 rounded-full bg-aqxBlueLight/20 px-2 py-1 text-aqxTextSecondary">
        <span className="h-2 w-2 rounded-full bg-aqxTextSecondary/60" />
        {product.category}
      </span>
    </div>
  )
}
