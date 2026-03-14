import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('returns null when totalPages is 1', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        total={5}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('returns null when total is 0', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        total={0}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders page buttons when totalPages > 1', () => {
    render(
      <Pagination
        currentPage={1}
        total={10}
        pageSize={3}
        onPageChange={vi.fn()}
      />,
    )
    expect(
      screen.getByRole('navigation', { name: /пагинац/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /страница 1/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /страница 2/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /страница 3/i }),
    ).toBeInTheDocument()
  })

  it('calls onPageChange when page button is clicked', () => {
    const onPageChange = vi.fn()
    render(
      <Pagination
        currentPage={1}
        total={10}
        pageSize={3}
        onPageChange={onPageChange}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /страница 2/i }))

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        total={10}
        pageSize={3}
        onPageChange={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /предыдущая/i })).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={4}
        total={10}
        pageSize={3}
        onPageChange={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: /следующая/i })).toBeDisabled()
  })
})
