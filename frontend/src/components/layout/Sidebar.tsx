import { ReactNode, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@utils/cn'

interface SidebarProps {
  children: ReactNode
  className?: string
}

export function Sidebar({ children, className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed md:hidden z-40 top-4 left-4 p-2 bg-white border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:relative md:z-0 z-30 inset-y-0 left-0 w-64 bg-secondary-900 text-white transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        {children}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

interface SidebarItemProps {
  icon?: ReactNode
  label: string
  href?: string
  onClick?: () => void
  isActive?: boolean
  badge?: string | number
  className?: string
}

export function SidebarItem({
  icon,
  label,
  href,
  onClick,
  isActive = false,
  badge,
  className,
}: SidebarItemProps) {
  const Component = href ? 'a' : 'button'
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200',
        isActive
          ? 'bg-primary-600 text-white'
          : 'text-secondary-200 hover:bg-secondary-800 hover:text-white',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
    </Component>
  )
}
