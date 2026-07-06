import { ReactNode } from 'react'
import { cn } from '@utils/cn'

interface AuthLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
}

export function AuthLayout({ children, title, subtitle, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-12">
      <div
        className={cn(
          'w-full max-w-md bg-white rounded-2xl shadow-xl p-8',
          className
        )}
      >
        {(title || subtitle) && (
          <div className="mb-8 text-center">
            {title && <h1 className="text-3xl font-bold text-secondary-900 mb-2">{title}</h1>}
            {subtitle && <p className="text-secondary-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
