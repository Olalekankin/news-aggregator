import React from 'react'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
}

const Link: React.FC<LinkProps> = ({
  href = '#',
  children,
  className = '',
  ...restProps
}) => {
  return (
    <a
      href={href}
      className={`text-blue-500 hover:text-blue-600 underline ${className}`}
      {...restProps}
    >
      {children}
    </a>
  )
}

export { Link }
