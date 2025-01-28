import React from 'react'
import { Link } from 'react-router-dom'

type ArticleCardProp2 = {
  id: string
  title: string
  description: string
  category: string
  published_at: string
  image_url: string
}

const ArticleCard2: React.FC<ArticleCardProp2> = ({
  id,
  title,
  description,
  category,
  published_at,
}) => {
  return (
    <Link
      to={`/${id}`}
      className='w-full md:w-[300px] border-b border-[#484848] py-2'
    >
      <div className='flex justify-between'>
        <p className='text-base font-light text-[#616060]'>{category}</p>
        <p className='font-normal text-xs text-[#3E3232BF] mt-1'>
          {published_at}
        </p>
      </div>
      <div>
        <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>{title}</h2>
        <p className='mt-4'>{description}</p>
      </div>
    </Link>
  )
}

export default ArticleCard2
