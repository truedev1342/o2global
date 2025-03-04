export const throttle = (fn: (...args: any[]) => void, wait: number) => {
  let inThrottle: boolean
  return function (...args: any[]) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), wait)
    }
  }
}
