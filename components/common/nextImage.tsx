import React from 'react'
import Image, { ImageProps, StaticImageData } from 'next/image'

type NextImageProps = {
  src: string | StaticImageData
  alt: string
  title?: string
  width?: number | `${number}`
  height?: number | `${number}`
  quality?: number
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  loading?: 'eager' | 'lazy'
  showTitle?: boolean
} & Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>

const NextImage: React.FC<NextImageProps> = ({
  src,
  alt,
  title,
  width,
  height,
  quality = 80,
  priority = false,
  fetchPriority = 'auto',
  loading = 'lazy',
  showTitle = true,
  ...rest
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      {...(showTitle ? { title: title || alt } : {})} // Conditionally add title prop
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      fetchPriority={fetchPriority}
      loading={priority ? 'eager' : loading}
      {...rest} // Spread any additional props
    />
  )
}

export default NextImage
