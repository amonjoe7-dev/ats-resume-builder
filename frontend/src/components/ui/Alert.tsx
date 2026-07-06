import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@utils/cn'

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
  className?: string
  children?: ReactNode
}

const typeStyles = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    title: 'text-green-900 font-semibold',
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    title: 'text-red-900 font-semibold',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    title: 'text-yellow-900 font-semibold',
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    title: 'text-blue-900 font-semibold',
  },
}

export function Alert({
  type = 'info',
  title,
  message,
  onClose,
  className,
  children,
}: AlertProps) {
  const styles = typeStyles[type]

  return (
    <div
      className={cn(
        'flex gap-4 p-4 border rounded-lg',
        styles.container,
        className
      )}
      role="alert"
    >
      <div className="flex-1">
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className="text-sm">{message}</p>
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
