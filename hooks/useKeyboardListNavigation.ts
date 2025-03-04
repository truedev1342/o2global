import { useCallback, useEffect, useState } from 'react'

export const useKeyboardListNavigation = ({
  list,
  listRef,
  itemId,
  onPressEnter
}: {
  list: any[]
  itemId: (index: number) => string
  listRef: React.MutableRefObject<HTMLElement | null>
  onPressEnter: (e: KeyboardEvent) => void
}) => {
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    if (activeIndex > list.length - 1) setActiveIndex(-1)
  }, [list])

  const onSelect = useCallback(
    (e: KeyboardEvent) => {
      if (list[activeIndex]) {
        onPressEnter(e)
      }
    },
    [activeIndex]
  )

  useEffect(() => {
    const item = document.getElementById(itemId(activeIndex))
    if (item && listRef.current) {
      if (
        item.getBoundingClientRect().bottom - 3 >
        listRef.current.getBoundingClientRect().bottom
      ) {
        listRef.current.scrollTop += item.getBoundingClientRect().height
      } else if (
        Math.abs(
          item.getBoundingClientRect().top -
            listRef.current.getBoundingClientRect().top
        ) <= 50 &&
        Math.abs(
          item.getBoundingClientRect().top -
            listRef.current.getBoundingClientRect().top
        ) >= 10 &&
        item.getBoundingClientRect().top <
          listRef.current.getBoundingClientRect().top &&
        activeIndex >= 0
      ) {
        listRef.current.scrollTop -= item.getBoundingClientRect().height
      }
    }
  }, [activeIndex])

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          e.stopPropagation()
          setActiveIndex((prev) => (prev === -1 ? prev : prev - 1))
          break

        case 'ArrowDown':
          e.preventDefault()
          e.stopPropagation()
          setActiveIndex((prev) => (prev === list.length - 1 ? prev : prev + 1))
          break

        case 'Enter':
          e.preventDefault()
          e.stopPropagation()
          onSelect(e)
          break
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'Enter':
          e.preventDefault()
      }
    }

    document.body.addEventListener('keyup', handleKeyUp)
    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keyup', handleKeyUp)
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, [onPressEnter, list?.length])

  return {
    activeIndex,
    setActiveIndex
  }
}
