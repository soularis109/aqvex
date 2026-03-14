import type { Product } from '../model/types'
import { Button, RatingStars } from '@shared/ui'
import { ProductPriceBlock } from './ProductPriceBlock'
import { ProductAvailabilityBadge } from './ProductAvailabilityBadge'
import { ProductVolumeSelect } from './ProductVolumeSelect'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = !product.in_stock

  return (
    <article className="flex h-full flex-col rounded-[32px] bg-aqxBlueLight/10 p-6 shadow-card">
      <div className="mb-4 flex flex-1 flex-col">
        <div className="mb-4 flex justify-center">
          <div className="flex h-44 w-32 items-center justify-center rounded-[28px] bg-white shadow-md">
            <span className="text-xs text-aqxTextSecondary">Фото</span>
          </div>
        </div>

        <ProductPriceBlock product={product} />

        <h3 className="mb-2 line-clamp-3 text-sm font-medium text-aqxTextPrimary">
          {product.name}
        </h3>
        <RatingStars
          rating={product.rating}
          reviewsCount={product.reviews_count}
        />
        <ProductAvailabilityBadge product={product} />
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-full bg-white p-1">
        <ProductVolumeSelect product={product} />

        <Button
          variant="primary"
          disabled={isOutOfStock}
          className="flex h-10 w-full flex-1 items-center justify-center px-4 font-semibold"
          aria-label="Добавить товар в корзину"
          data-testid="add-to-cart-button"
        >
          В корзину
        </Button>
      </div>
    </article>
  )
}
