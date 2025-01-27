// Component to render icons
import React from 'react'

type IconProps = {
  src: string 
  className?: string 
  alt?: string 
}

const Icon: React.FC<IconProps> = ({ src, className = '', alt = 'icon' }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`inline-block ${className}`}
      loading='lazy'
    />
  )
}

export { Icon }

