import { DebouncedFunction } from '@/types/type'
import { useEffect, useState } from 'react'

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  returnPromise: boolean = false,
  leading: boolean = false
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let isCalledOnce = false

  if (returnPromise) {
    // Return a Promise when returnPromise is true
    return ((...args: Parameters<T>) => {
      return new Promise<ReturnType<T>>((resolve, reject) => {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        if (leading && !isCalledOnce) {
          isCalledOnce = true
          try {
            const result = func(...args)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        }

        timeoutId = setTimeout(async () => {
          try {
            const result = await func(...args)
            resolve(result)
          } catch (error) {
            reject(error)
          }
          isCalledOnce = false
        }, wait)
      })
    }) as DebouncedFunction<T>
  } else {
    // Return void when returnPromise is false
    return ((...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      if (leading && !isCalledOnce) {
        isCalledOnce = true
        func(...args)
      }

      timeoutId = setTimeout(() => {
        func(...args)
        isCalledOnce = false
      }, wait)
    }) as DebouncedFunction<T>
  }
}
