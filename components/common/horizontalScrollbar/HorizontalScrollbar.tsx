import { useState, useEffect, useRef, useCallback } from 'react'
import Styles from './HorizontalScrollbar.module.scss'

const SCROLL_BOX_MIN_WIDTH = 20

interface HorizontalScrollbarProps {
  className?: string
  scrollbarClassName?: string
  containerClassName?: string
  children: React.ReactNode
  tag?: keyof JSX.IntrinsicElements | string | any
  uniqueRaf?: any
  id?: any
  isSlide?: boolean
  hideScrollbar?: boolean
  onScroll?: (position: number, isDragging: boolean) => void
  onClick?: () => void
  onDragStart?: () => void
  onDragEnd?: () => void
}

const HorizontalScrollbar = ({
  children,
  className = '',
  uniqueRaf = '',
  tag: Tag = 'div',
  id = 'customHorizontalScrollhost',
  scrollbarClassName = '',
  containerClassName = '',
  isSlide = false,
  hideScrollbar = false,
  onClick = () => {},
  onScroll = () => {},
  onDragEnd = () => {},
  onDragStart = () => {}
}: HorizontalScrollbarProps) => {
  const [hovering, setHovering] = useState(false)
  const [scrollBoxWidth, setScrollBoxWidth] = useState(SCROLL_BOX_MIN_WIDTH)
  const [scrollBoxLeft, setScrollBoxLeft] = useState(0)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)
  const [startScroll, setStartScroll] = useState(false)
  const scrollHostRef = useRef<HTMLDivElement>(uniqueRaf)
  const [childWidth, setChildWidth] = useState(0)
  const scrollThumbRef = useRef<HTMLDivElement>(null)

  const [isDown, setIsDown] = useState(false)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDownContainer = (e: MouseEvent) => {
    e.stopPropagation()

    if (scrollHostRef.current) {
      setIsDown(true)
      setStartX(e.pageX - scrollHostRef.current.offsetLeft)
      setScrollLeft(scrollHostRef.current.scrollLeft)
    }
  }

  const handleMouseLeaveContainer = () => {
    if (scrollHostRef.current) {
      setIsDown(false)
    }
  }

  const handleMouseMoveContainer = (e: MouseEvent) => {
    if (!isDown || !scrollHostRef.current) return
    e.preventDefault()

    const x = e.pageX - scrollHostRef.current.offsetLeft
    const walk = (x - startX) * 2 // scroll-fast
    scrollHostRef.current.scrollLeft = scrollLeft - walk
    onScroll(scrollHostRef.current.scrollLeft, isDragging || isDown)
  }

  const handleMouseOver = useCallback(() => {
    !hovering && setHovering(true)
  }, [hovering])

  const handleMouseOut = useCallback(() => {
    !!hovering && setHovering(false)

    if (isSlide) handleMouseLeaveContainer()
  }, [hovering])

  let scrollTimeout: any

  const handleScroll = () => {
    if (!scrollHostRef.current) {
      return
    }

    onScroll(scrollHostRef.current.scrollLeft, isDragging || isDown)

    setStartScroll(true)
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      setStartScroll(false)
    }, 200)
    const scrollHostElement = scrollHostRef.current
    const { scrollLeft, scrollWidth, offsetWidth } = scrollHostElement

    let newLeft = (scrollLeft / scrollWidth) * offsetWidth
    newLeft = Math.min(newLeft, offsetWidth - scrollBoxWidth)
    setScrollBoxLeft(newLeft)
  }

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.stopPropagation()
    if (
      isSlide &&
      scrollHostRef.current &&
      scrollHostRef.current.contains(e.target as Node)
    ) {
      handleMouseDownContainer(e)
      setIsDragging(true)
    } else if (e.target === scrollThumbRef.current) {
      setIsDragging(true)
      setStartX(e.clientX)
      setStartScrollLeft(scrollHostRef.current?.scrollLeft || 0)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (!isDragging || !scrollHostRef.current) return
      if (isDown) {
        handleMouseMoveContainer(e)
        return
      }
      const deltaX = e.clientX - startX
      const percentage = deltaX / scrollHostRef.current.clientWidth
      scrollHostRef.current.scrollLeft =
        startScrollLeft + percentage * scrollHostRef.current.scrollWidth
      onScroll(scrollHostRef.current.scrollLeft, isDragging || isDown)
    },
    [isDragging, startX, startScrollLeft]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsDown(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.body.addEventListener('mousemove', handleMouseMove)
      document.body.addEventListener('mouseup', handleMouseUp)
    } else {
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  useEffect(() => {
    if (scrollHostRef.current) {
      const scrollHostElement = scrollHostRef.current
      const { clientWidth, scrollWidth } = scrollHostElement
      const scrollBoxPercentage = clientWidth / scrollWidth
      const scrollbarWidth = Math.max(
        scrollBoxPercentage * clientWidth,
        SCROLL_BOX_MIN_WIDTH
      )

      setScrollBoxWidth(scrollbarWidth)
      setShowScrollbar(scrollWidth > clientWidth)

      scrollHostElement.addEventListener('scroll', handleScroll, true)
      return function cleanup() {
        scrollHostElement.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [handleScroll, childWidth])

  useEffect(() => {
    const targetElement = document.getElementById(id)
    if (targetElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width
          setChildWidth(newWidth)
        }
      })

      resizeObserver.observe(targetElement)

      return () => resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    if (isDragging) {
      onDragStart()
      document.body.style.cursor = 'grab'
    } else {
      onDragEnd()
      document.body.style.cursor = 'default'
    }
  }, [isDragging])

  return (
    <div
      className={`position-relative customScrollbarWrap ${
        startScroll ? 'startScroll' : 'stopScroll'
      } ${containerClassName} ${Styles.scrollBarContainer}`}
    >
      <Tag
        className={`${Styles.scrollHost} ${className}`}
        ref={scrollHostRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        id={id}
        style={{
          cursor: isSlide
            ? scrollHostRef.current.scrollWidth >
              scrollHostRef.current.clientWidth
              ? 'grab'
              : 'default'
            : 'default',
          userSelect: isSlide ? 'none' : 'unset'
        }}
        onClick={onClick}
      >
        {children}
      </Tag>
      {showScrollbar && (
        <div
          className={`scrollBar ${Styles.horizontal} ${Styles.scrollBar} ${scrollbarClassName}`}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseOver}
          onMouseLeave={handleMouseOut}
          style={{
            opacity: 1,
            width: '100%',
            height: '6px',
            bottom: '0',
            visibility: hideScrollbar ? 'hidden' : 'visible'
          }}
        >
          <div
            className={`scrollThumb ${Styles.scrollThumb}`}
            style={{ width: scrollBoxWidth, left: scrollBoxLeft }}
            ref={scrollThumbRef}
          />
        </div>
      )}
    </div>
  )
}

export default HorizontalScrollbar
