import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'

type CardProp3 = {
  id: number
  title: string
  source: string
  author: string
  image_url: string
}

const ArticleCard3: React.FC<CardProp3> = ({
  id,
  title,
  source,
  author,
  image_url,
}) => {
  return (
    <>
      <Link
        to={`/article/${id}`}
        className='w-full flex mt-5 border border-gray-300 space-x-3 h-44'
      >
        {/* Image Column */}
        <div className='flex-1 h-full'>
          <Img
            src={image_url}
            className='w-full h-full object-cover rounded-md'
          />
        </div>
        {/* Text Column */}
        <div className='flex-1 flex flex-col space-y-2 h-full'>
          <div className='flex flex-col space-y-5'>
            <h2 className='text-wrap py-1.5 text-sm font-medium text-[#161515] border-b border-gray-300'>
              {title}
            </h2>
            <div>
              <p className='text-wrap text-sm font-medium'>{source}</p>
              <p className='mtext-wrap text-sm'>{author}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ArticleCard3
