import type { Product } from '../model/types'
import { Select } from '@shared/ui'

type ProductVolumeSelectProps = {
  product: Product
}

export function ProductVolumeSelect({ product }: ProductVolumeSelectProps) {
  return (
    <div className="flex min-w-[120px] flex-none">
      <Select
        defaultValue={product.selected_volume_id}
        aria-label="Выберите объем товара"
      >
        {product.volumes.map((volume) => (
          <option key={volume.id} value={volume.id} disabled={!volume.in_stock}>
            {volume.label}
            {!volume.in_stock ? ' — нет в наличии' : ''}
          </option>
        ))}
      </Select>
    </div>
  )
}
