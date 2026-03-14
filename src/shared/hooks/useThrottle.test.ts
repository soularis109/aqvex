import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useThrottle } from './useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('updates after interval elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      {
        initialProps: { value: 'first', interval: 300 },
      },
    )

    expect(result.current).toBe('first')

    rerender({ value: 'second', interval: 300 })
    expect(result.current).toBe('first')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('second')
  })

  it('throttles rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      {
        initialProps: { value: 'a', interval: 300 },
      },
    )

    rerender({ value: 'b', interval: 300 })
    rerender({ value: 'c', interval: 300 })
    expect(result.current).toBe('a')

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current).toBe('c')
  })
})
