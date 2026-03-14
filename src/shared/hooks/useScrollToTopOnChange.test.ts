import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useScrollToTopOnChange } from './useScrollToTopOnChange'

describe('useScrollToTopOnChange', () => {
  let scrollToSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    scrollToSpy.mockRestore()
  })

  it('calls window.scrollTo on mount', () => {
    renderHook(() => useScrollToTopOnChange(1))

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
    expect(scrollToSpy).toHaveBeenCalledTimes(1)
  })

  it('calls window.scrollTo when dependency changes', () => {
    const { rerender } = renderHook(
      ({ page }) => useScrollToTopOnChange(page),
      { initialProps: { page: 1 } },
    )

    scrollToSpy.mockClear()

    rerender({ page: 2 })

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })
})
