import React from 'react'
import {Icon} from '../Icon'
import { Button } from '../Button'

type SearchBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  iconSrc: string // Path to the SVG icon
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  className = '',
  iconSrc,
  ...restProps
}) => {
  return (
    <div className='relative w-full'>
      {/* SVG Icon */}
      <Button className='absolute inset-y-0 right-3 flex items-center cursor-pointer z-20'>
        <Icon
          src={iconSrc}
          className='w-5 h-5 text-gray-500'
          alt='Search Icon'
        />
      </Button>

      {/* Input */}
      <input
        type='text'
        placeholder={placeholder}
        className={`lg:border border-gray-300 bg-gray-200  lg:bg-[#F5F5F5] pl-10 pr-4 py-2 md:py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FC4308] rounded-md ${className}`}
        {...restProps}
      />
    </div>
  )
}

export { SearchBox }
