import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('returns debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 300 },
      },
    )

    expect(result.current).toBe('first')

    rerender({ value: 'second', delay: 300 })
    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('second')
  })

  it('cancels previous timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'a', delay: 300 },
      },
    )

    rerender({ value: 'b', delay: 300 })
    vi.advanceTimersByTime(100)
    rerender({ value: 'c', delay: 300 })
    vi.advanceTimersByTime(100)
    rerender({ value: 'd', delay: 300 })

    expect(result.current).toBe('a')
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('d')
  })
})
