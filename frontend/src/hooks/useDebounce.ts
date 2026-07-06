import { useCallback } from 'react'

export interface UseDebounceOptions {
  wait?: number
}

export function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  options: UseDebounceOptions = {}
) {
  const { wait = 300 } = options

  const debounced = useCallback(
    (() => {
      let timeoutId: ReturnType<typeof setTimeout>

      return (...args: unknown[]) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          callback(...args)
        }, wait)
      }
    })(),
    [callback, wait]
  )

  return debounced as T
}
