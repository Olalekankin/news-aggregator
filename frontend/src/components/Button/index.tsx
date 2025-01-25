import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  middleIcon?: React.ReactNode 
  onClickHandler?: () => void
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  leftIcon,
  middleIcon,
  rightIcon,
  onClickHandler,
  ...restProps
}) => {
  return (
    <button
      className={`flex items-center justify-center space-x-2 ${className}`}
      onClick={onClickHandler} 
      {...restProps}
    >
      {/* Left Icon */}
      {leftIcon && (
        <span className='flex-shrink-0'>
          {typeof leftIcon === 'string' ? (
            <img src={leftIcon} alt='left icon' className='w-4 h-4' />
          ) : (
            leftIcon
          )}
        </span>
      )}

      {/* Middle Icon */}
      {middleIcon && !children && (
        <span className='flex-shrink-0'>
          {typeof middleIcon === 'string' ? (
            <img src={middleIcon} alt='middle icon' className='w-4 h-4' />
          ) : (
            middleIcon
          )}
        </span>
      )}

      {/* Text/Children */}
      {children && <span>{children}</span>}

      {/* Right Icon */}
      {rightIcon && (
        <span className='flex-shrink-0'>
          {typeof rightIcon === 'string' ? (
            <img src={rightIcon} alt='right icon' className='w-4 h-4' />
          ) : (
            rightIcon
          )}
        </span>
      )}
    </button>
  )
}

export { Button }
