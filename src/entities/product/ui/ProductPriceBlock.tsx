import type { Product } from '../model/types'

type ProductPriceBlockProps = {
  product: Product
}

export function ProductPriceBlock({ product }: ProductPriceBlockProps) {
  return (
    <div className="mb-2 flex items-baseline gap-2 text-sm">
      <span className="text-xs text-aqxTextSecondary line-through">
        {product.old_price.toLocaleString('ru-RU')} {product.currency}
      </span>
      <span className="text-lg font-semibold text-aqxTextPrimary">
        {product.price.toLocaleString('ru-RU')} {product.currency}
      </span>
      <span className="rounded-full bg-aqxDiscount/10 px-2 py-0.5 text-xs font-semibold text-aqxDiscount">
        -{product.discount_percent}%
      </span>
    </div>
  )
}
