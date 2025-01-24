import React from 'react'

const variants = {
  fill: 'bg-primary text-white',
  outline: 'border border-primary text-primary bg-transparent',
  text: 'text-primary bg-transparent',
} as const;

const shapes = {
  rounded: 'rounded-full',
  square: 'rounded-none',
  default: 'rounded-md',
} as const;

const sizes = {
  lg: 'h-[48px] px-5 text-[16px]',
  md: 'h-[40px] px-4 text-[14px]',
  sm: 'h-[32px] px-3 text-[12px]',
  xs: 'h-[28px] px-2 text-[10px]',
} as const;
type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick'
> &
  Partial<{
    className: string
    leftIcon: React.ReactNode
    rightIcon: React.ReactNode
    onClick: () => void
    shape: keyof typeof shapes
    variant: keyof typeof variants | null
    size: keyof typeof sizes
    color: string
  }>;
const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = '',
  leftIcon,
  rightIcon,
  shape = 'default',
  variant = 'fill',
  size = 'xs',
  color = 'gray',
  ...restProps
}) => {
  return (
    <button
      className={`
        ${className} 
        flex flex-row items-center justify-center text-center cursor-pointer 
        ${shapes[shape]} 
        ${variants[variant || 'fill']} 
        ${sizes[size]} 
        text-${color}
      `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  )
}

export { Button }
