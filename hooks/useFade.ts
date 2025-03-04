import { useEffect, useRef, useState } from 'react'

export const useFade = ({
  elementRef,
  animationSpeed = 1000,
  dependencies
}: //   isAnimate: isInitialAnimate = true
{
  elementRef: React.MutableRefObject<HTMLElement | null>
  animationSpeed?: number
  dependencies: any[]
  //   isAnimate?: boolean
}) => {
  //   const [isAnimate, setIsAnimate] = useState(isInitialAnimate)
  const renderCountRef = useRef(0)

  useEffect(() => {
    if (renderCountRef.current >= 1) {
      const element = elementRef.current
      if (element) {
        element.style.opacity = '0.4'
        setTimeout(() => {
          if (element) {
            element.style.transition = `opacity ${animationSpeed / 1000}s`
            element.style.opacity = '1'

            setTimeout(() => {
              if (element) element.style.transition = 'none'
            }, animationSpeed)
          }
        }, 0)
      }
    }
    renderCountRef.current++
  }, [...dependencies])

  return {
    // setIsAnimate
  }
}
