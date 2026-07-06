import { ReactNode } from 'react'
import { LogOut, User, Settings } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { cn } from '@utils/cn'

interface HeaderProps {
  title?: string
  subtitle?: string
  className?: string
  children?: ReactNode
  actions?: ReactNode
}

export function Header({
  title,
  subtitle,
  className,
  children,
  actions,
}: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 bg-white border-b border-secondary-200 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex-1">
          {title && <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>}
          {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
          {children}
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-4 ml-4">
          {actions}

          {user && (
            <div className="flex items-center gap-3 pl-4 border-l border-secondary-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-secondary-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-secondary-500">{user.email}</p>
              </div>
              <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.firstName} className="w-8 h-8 rounded-full" />
                ) : (
                  <User size={20} />
                )}
              </button>
              <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
              <button
                onClick={logout}
                className="p-2 text-secondary-600 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
