import { ReactNode } from 'react'
import { cn } from '@utils/cn'

interface TabsProps {
  tabs: Array<{ label: string; id: string }>
  activeTab: string
  onChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('border-b border-secondary-200', className)}>
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'px-1 py-3 font-medium text-sm border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-secondary-600 hover:text-secondary-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

interface TabContentProps {
  children: ReactNode
  className?: string
}

export function TabContent({ children, className }: TabContentProps) {
  return (
    <div className={cn('py-4', className)}>
      {children}
    </div>
  )
}
