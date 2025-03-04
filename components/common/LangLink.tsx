'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { ButtonProps } from 'react-bootstrap'
import { UrlObject, Url } from 'url'

type LangLinkProps = {
  href: string | UrlObject
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  title: string
  prefetch?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

const LangLink = ({
  href,
  onClick,
  className = '',
  children,
  title = '',
  prefetch = true,
  ...rest
}: LangLinkProps) => {
  const { language } = useParams()

  // Modify the provided href attribute to add language to it
  const getHref = () => {
    if (typeof href === 'string') {
      return `/${language}${href}`
    } else {
      const { pathname } = href
      const langPathname = `/${language}${pathname}`
      return {
        pathname: langPathname,
        ...(href as UrlObject)
      } as UrlObject
    }
  }

  return (
    <Link
      href={language ? (getHref() as Url) : href}
      onClick={onClick}
      {...(className && { className: className })}
      title={title}
      prefetch={prefetch}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default LangLink
