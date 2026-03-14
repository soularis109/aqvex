import { ErrorBoundary } from '@shared/ui'
import { ProductsPage } from '@pages/products'

export function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-aqxBg text-aqxTextPrimary">
        <ProductsPage />
      </div>
    </ErrorBoundary>
  )
}
