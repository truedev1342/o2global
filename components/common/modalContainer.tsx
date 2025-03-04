import React, { useEffect, useState } from 'react'
type ModalContainerProps = {
  children: React.ReactNode
  open: boolean
  loadTime?: number
}
const ModalContainer = ({
  children,
  open,
  loadTime = 2000
}: ModalContainerProps) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true)
    }, loadTime)
  }, [])

  if (!open && !shouldRender) return null

  return <>{children}</>
}

export default ModalContainer
