import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'

type ArticleCardProp = {
  id: string
  title: string
  description: string
  image_url: string
  
}

const ArticleCard: React.FC<ArticleCardProp> = ({
  id,
  title,
  description,
  image_url,

}) => {
  return (
    <Link to={`/article/${id}`} className='w-full grid grid-cols-5 gap-3 h-32'>
      {/* Image Column */}
      <div className='col-span-2'>
        <Img
          src={image_url} 
          className='w-full h-full object-cover rounded-md'
        />
      </div>
      {/* Text Column */}
      <div className='col-span-3 flex flex-col justify-between'>
        <h2 className='text-wrap py-1.5 text-sm font-medium text-[#3E3232] border-b'>
          {title}
        </h2>
        <p className='mt-1.5 text-wrap text-sm'>{description}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
