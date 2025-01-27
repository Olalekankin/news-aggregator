import React from 'react'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
}

const Links: React.FC<LinkProps> = ({
  href = '#',
  children,
  className = '',
  ...restProps
}) => {
  return (
    <a
      href={href}
      className={`text-[#3E3232] hover:text-[#FC4308] text-base font-medium transition-colors duration-500 ease-in ${className}`}
      {...restProps}
    >
      {children}
    </a>
  )
}

export { Links }
