import type { ReactNode } from 'react'
import { Button } from '@shared/ui'
import { useCallback, useEffect, useState } from 'react'

type ErrorToolbarProps = {
  error: ReactNode
  onClose?: () => void
  autoHideMs?: number
}

export function ErrorToolbar({
  error,
  onClose,
  autoHideMs = 0,
}: ErrorToolbarProps) {
  const [visible, setVisible] = useState(Boolean(error))

  const handleClose = useCallback(() => {
    setVisible(false)
    onClose?.()
  }, [onClose])

  useEffect(() => {
    setVisible(Boolean(error))
  }, [error])

  useEffect(() => {
    if (!visible || !autoHideMs) return

    const timer = setTimeout(() => {
      handleClose()
    }, autoHideMs)

    return () => clearTimeout(timer)
  }, [visible, autoHideMs, handleClose])

  if (!error || !visible) return null

  return (
    <section
      aria-label="Сообщение об ошибке"
      role="alert"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <div className="flex max-w-xl flex-1 items-center justify-between gap-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800 shadow-lg shadow-red-500/10 ring-1 ring-red-100">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-700">
            !
          </span>
          <div className="break-words">{error}</div>
        </div>
        <Button
          variant="ghost"
          aria-label="Закрыть сообщение об ошибке"
          onClick={handleClose}
          className="inline-flex h-7 w-7 items-center justify-center border-0 bg-transparent px-0 py-0 text-lg text-red-500 transition hover:bg-red-100 hover:text-red-700"
        >
          ×
        </Button>
      </div>
    </section>
  )
}
