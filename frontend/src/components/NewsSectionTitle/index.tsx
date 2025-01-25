import React from 'react'
import { GoDotFill } from 'react-icons/go'

type NewsSectionTitleProps = {
  title: string
}

export default function NewsSectionTitle({ title }: NewsSectionTitleProps) {
  return (
    <div className='flex items-center space-x-1'>
      <GoDotFill className='text-red-500' />
      <h3 className='text-lg font-medium text-gray-800'>{title}</h3>
    </div>
  )
}
