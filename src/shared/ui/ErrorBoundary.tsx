import { Component, type ErrorInfo, type ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
  fallback?: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

/**
 * Error boundary - must be a class component (React does not support
 * error boundaries in function components).
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            data-testid="error-boundary-fallback"
            className="flex min-h-screen flex-col items-center justify-center p-8 text-center"
          >
            <h1 className="mb-4 text-xl font-semibold text-aqxTextPrimary">
              Щось пішло не так
            </h1>
            <p className="text-sm text-aqxTextSecondary">
              Спробуйте оновити сторінку
            </p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
