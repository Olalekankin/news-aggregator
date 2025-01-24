import React from 'react'

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string
}

const Img: React.FC<ImgProps> = ({
  src,
  alt = '',
  className = '',
  ...restProps
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      {...restProps}
    />
  )
}

export { Img }
