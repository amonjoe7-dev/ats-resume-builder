import { ReactNode } from 'react'
import { cn } from '@utils/cn'

interface MainLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  className?: string
}

export function MainLayout({
  children,
  sidebar,
  header,
  className,
}: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-secondary-50 overflow-hidden">
      {/* Sidebar */}
      {sidebar && <div className="hidden md:flex md:flex-col md:w-64">{sidebar}</div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header && <div>{header}</div>}

        {/* Content */}
        <main className={cn('flex-1 overflow-auto', className)}>
          {children}
        </main>
      </div>
    </div>
  )
}
