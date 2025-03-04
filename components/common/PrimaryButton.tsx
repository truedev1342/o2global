'use client'

import React from 'react'
import { Button } from 'react-bootstrap'

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  variant: string
  size?: 'sm' | 'lg'
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  value,
  id,
  variant,
  className,
  size,
  name,
  type = 'button',
  'aria-label': ariaLabel,
  ...rest
}) => {
  return (
    <Button
      id={id}
      variant={variant}
      className={className}
      size={size}
      name={name}
      type={type}
      aria-label={ariaLabel}
      {...rest}
    >
      {value}
    </Button>
  )
}

export default PrimaryButton
