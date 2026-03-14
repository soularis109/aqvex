import { Button } from '@shared/ui'

interface PaginationProps {
  currentPage: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2 text-sm"
      aria-label="Пагинация по страницам товаров"
    >
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3"
        aria-label="Предыдущая страница"
      >
        ‹
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'secondaryActive' : 'secondary'}
          onClick={() => onPageChange(page)}
          className="px-4"
          aria-label={`Страница ${page}`}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3"
        aria-label="Следующая страница"
      >
        ›
      </Button>
    </nav>
  )
}
