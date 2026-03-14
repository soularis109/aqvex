import type { ReactNode } from 'react'

type PageLayoutProps = {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-8 lg:px-0">
      <main role="main" className="flex flex-1 flex-col gap-6">
        {children}
      </main>
    </div>
  )
}
