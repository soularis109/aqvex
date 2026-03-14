import { useEffect } from 'react'

export function useScrollToTopOnChange(dep: unknown): void {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [dep])
}
