"use client"
import { useState, useEffect, useRef, useCallback } from 'react'
import Styles from './CustomScrollbar.module.scss'

const SCROLL_BOX_MIN_HEIGHT = 20

interface CustomScrollbarProps {
  className: string
  children: React.ReactNode
  tag?: keyof JSX.IntrinsicElements | string | any
  uniqueRaf?: any
  id?: any
  scrollbarDelay?: number
}

const VerticalScrollbar = ({
  children,
  className = '',
  uniqueRaf = '',
  tag: Tag = 'div',
  id = 'customScrollhost',
  scrollbarDelay = 0
}: CustomScrollbarProps) => {
  const [hovering, setHovering] = useState(false)
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT)
  const [scrollBoxTop, setScrollBoxTop] = useState(0)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startScrollTop, setStartScrollTop] = useState(0)
  const [startScroll, setStartScroll] = useState(false)
  const [childHeight, setChildHeight] = useState(0)

  const handleMouseOver = useCallback(() => {
    !hovering && setHovering(true)
  }, [hovering])

  const handleMouseOut = useCallback(() => {
    !!hovering && setHovering(false)
  }, [hovering])

  const handleMouseOverScroll = useCallback(() => {
    !hovering && setHovering(true)
  }, [hovering])

  const handleMouseOutScroll = useCallback(() => {
    !!hovering && setHovering(false)
  }, [hovering])

  let scrollTimeout: any

  const handleScroll = () => {
    if (!scrollHostRef.current) {
      return
    }
    setStartScroll(true)
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      setStartScroll(false)
    }, 200)
    const scrollHostElement = scrollHostRef.current
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement

    let newTop = (scrollTop / scrollHeight) * offsetHeight
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight)
    setScrollBoxTop(newTop)
  }

  const scrollHostRef = useRef<HTMLDivElement>(uniqueRaf)
  const scrollThumbRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (e.target === scrollThumbRef.current) {
        setIsDragging(true)
        setStartY(e.clientY)
        setStartScrollTop(scrollHostRef.current?.scrollTop || 0)
      }
    },
    [isDragging, startY, startScrollTop]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      if (!isDragging || !scrollHostRef.current) return
      const deltaY = e.clientY - startY
      const percentage = deltaY / scrollHostRef.current.clientHeight
      scrollHostRef.current.scrollTop =
        startScrollTop + percentage * scrollHostRef.current.scrollHeight
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [isDragging])

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
      const { clientHeight, scrollHeight } = scrollHostElement
      const scrollBoxPercentage = clientHeight / scrollHeight
      const scrollbarHeight = Math.max(
        scrollBoxPercentage * clientHeight,
        SCROLL_BOX_MIN_HEIGHT
      )

      setScrollBoxHeight(scrollbarHeight)
      setShowScrollbar(scrollHeight > clientHeight)

      scrollHostElement.addEventListener('scroll', handleScroll, true)
      return function cleanup() {
        scrollHostElement.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [childHeight, handleScroll])

  useEffect(() => {
    const targetElement = document.getElementById(id)
    if (targetElement) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
          // Check the new height
          setTimeout(() => {
            const newHeight = (targetElement.firstElementChild! as HTMLElement)
              .offsetHeight
            setChildHeight(newHeight)
          }, scrollbarDelay)
        })
      })

      observer.observe(targetElement.firstElementChild!, {
        attributes: true, // Observe attribute changes
        childList: true, // Observe changes to child elements
        subtree: true, // Observe the entire subtree
        characterData: true // Observe text changes
      })

      return () => observer.disconnect()
    }
  }, [scrollbarDelay])

  useEffect(() => {
    document.body.addEventListener('mousedown', handleMouseDown)
  }, [])

  useEffect(() => {
    if (uniqueRaf !== '') {
      uniqueRaf.current = scrollHostRef?.current
    }
  }, [uniqueRaf])

  return (
    <div
      className={`position-relative customScrollbarWrap ${
        startScroll ? 'startScroll' : 'stopScroll'
      } ${Styles.scrollBarContainer}`}
      id="customScrollbarContainer"
    >
      <Tag
        className={`${Styles.scrollHost} ${className}`}
        ref={scrollHostRef}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        id={id}
      >
        {children}
      </Tag>
      {showScrollbar && (
        <div
          className={`scrollBar ${Styles.scrollBar}`}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseOverScroll}
          onMouseLeave={handleMouseOutScroll}
          style={{ opacity: 1 }}
        >
          <div
            className={`scrollThumb ${Styles.scrollThumb}`}
            style={{ height: scrollBoxHeight, top: scrollBoxTop }}
            ref={scrollThumbRef}
          />
        </div>
      )}
    </div>
  )
}

export default VerticalScrollbar
