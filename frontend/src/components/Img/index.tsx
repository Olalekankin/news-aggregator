import React from 'react'

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string
}

const Img: React.FC<ImgProps> = ({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  ...restProps
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      loading={loading}
      {...restProps}
    />
  )
}

export { Img }
