import type { SortOption } from '@shared/api'
import { Input } from './Input'
import { Select } from './Select'

interface HeaderProps {
  search: string
  sortBy: SortOption
  onSearchChange: (value: string) => void
  onSortChange: (value: SortOption) => void
}

const sortLabels: Record<SortOption, string> = {
  popular: 'По популярности',
  price_asc: 'По цене (дешевле)',
  price_desc: 'По цене (дороже)',
  discount: 'По скидке',
}

export function Header({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
}: HeaderProps) {
  return (
    <header
      className="flex flex-col items-stretch gap-4 rounded-[32px] bg-white px-6 py-5 shadow-card md:flex-row md:items-center md:justify-between md:gap-6 md:px-10 md:py-6"
      role="banner"
    >
      <div className="text-2xl font-semibold tracking-[0.12em] text-aqxBlue uppercase md:w-auto">
        AQVEX
      </div>

      <form
        role="search"
        className="flex-1 md:max-w-xl"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Поиск по товарам"
      >
        <Input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск"
          startAdornment="🔍"
        />
      </form>

      <div className="flex items-center gap-2 text-sm text-aqxTextSecondary md:w-auto">
        <span className="whitespace-nowrap">Сортировать:</span>
        <label className="sr-only" htmlFor="sort-select">
          Сортировка товаров
        </label>
        <Select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          {Object.entries(sortLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
    </header>
  )
}
