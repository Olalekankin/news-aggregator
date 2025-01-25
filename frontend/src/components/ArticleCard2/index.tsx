import React from 'react'
import { Link } from 'react-router-dom'

type ArticleCardProp2 = {
  articleId: string,
}

const ArticleCard2: React.FC<ArticleCardProp2> = ({
  articleId,
}) => {

  return (
    <Link to={`/article/${articleId}`} className='w-full md:w-[300px] lg:w-[400px] border-b border-[#484848]'>
      <div className='flex justify-between'>
        <p className='text-base font-light text-[#616060]'>Politic</p>
        <p className='font-normal text-xs text-[#3E3232BF] mt-1'>
          August 18, 2022
        </p>
      </div>
      <div>
        <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>
          Opening Day of Boating Season, Seattle WA
        </h2>
      </div>
    </Link>
  )
}

export default ArticleCard2
