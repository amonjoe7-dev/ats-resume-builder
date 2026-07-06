import { ReactNode } from 'react'
import { cn } from '@utils/cn'

interface AuthLayoutProps {
  children: ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-12">
      <div
        className={cn(
          'w-full max-w-md bg-white rounded-2xl shadow-xl p-8',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
