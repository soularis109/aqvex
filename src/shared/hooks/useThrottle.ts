import { useEffect, useRef, useState } from 'react'

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdated = useRef<number>(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const now = Date.now()
    if (lastUpdated.current === 0) lastUpdated.current = now
    const elapsed = now - lastUpdated.current

    if (elapsed >= interval) {
      lastUpdated.current = now
      /* eslint-disable-next-line react-hooks/set-state-in-effect -- throttle: update after interval */
      setThrottledValue(value)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      const remaining = interval - elapsed
      timeoutRef.current = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
        timeoutRef.current = null
      }, remaining)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [value, interval])

  return throttledValue
}
