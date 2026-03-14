import { pluralizeProducts } from '@shared/lib'

type CatalogResultsSummaryProps = {
  total: number
}

export function CatalogResultsSummary({ total }: CatalogResultsSummaryProps) {
  return (
    <header className="mb-6 flex items-center justify-between text-sm text-aqxTextSecondary">
      <p aria-live="polite">{pluralizeProducts(total)}</p>
    </header>
  )
}
