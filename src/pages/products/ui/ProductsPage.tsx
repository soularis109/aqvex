import {
  Header,
  Footer,
  Pagination,
  ErrorToolbar,
  PageLayout,
} from '@shared/ui'
import { useScrollToTopOnChange } from '@shared/hooks'
import { useProducts } from '@entities/product'
import { CatalogResultsGrid } from '@widgets/catalogResultsGrid'
import { CatalogResultsSummary } from '@widgets/catalogResultsSummary'

function ProductsPage() {
  const {
    products,
    total,
    loading,
    error,
    currentPage,
    pageSize,
    search,
    sortBy,
    setSearch,
    setSortBy,
    setPage,
  } = useProducts()

  useScrollToTopOnChange(currentPage)

  return (
    <PageLayout>
      <Header
        search={search}
        sortBy={sortBy}
        onSearchChange={setSearch}
        onSortChange={setSortBy}
      />

      <section aria-label="Результаты поиска">
        <CatalogResultsSummary total={total} />
      </section>

      <section aria-label="Список товаров" className="flex-1">
        <CatalogResultsGrid products={products} loading={loading} />
      </section>

      <section aria-label="Пагинация каталога">
        <Pagination
          currentPage={currentPage}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </section>

      <ErrorToolbar error={error} />

      <Footer />
    </PageLayout>
  )
}

export default ProductsPage
