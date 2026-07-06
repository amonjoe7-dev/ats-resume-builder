import { ReactNode } from 'react'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '@hooks/useAuth'
import { cn } from '@utils/cn'

interface HeaderProps {
  title?: string
  className?: string
  children?: ReactNode
}

export function Header({ title, className, children }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 bg-white border-b border-secondary-200 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div>
          {title && <h1 className="text-2xl font-bold text-secondary-900">{title}</h1>}
          {children}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-secondary-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-secondary-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.firstName} className="w-full h-full rounded-full" />
                ) : (
                  <User size={20} />
                )}
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
            aria-label="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
