import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'

type ArticleCardProp3 = {
  articleId: string
}

const ArticleCard3: React.FC<ArticleCardProp3> = ({ articleId }) => {
  return (
    <Link
      to={`/${articleId}`}
      className='w-full grid grid-cols-5 gap-4 grid-rows-[100px] border'
    >
      <div className='col-span-2 h-full'>
       <Img src='assets/card.png' className='w-full h-full'/>
      </div>
      <div className='col-start-3 col-end-6'>
        <h2 className=' text-wrap py-1.5 text-sm font-medium text-[#3E3232] border-b'>
          Opening Day of Boating Season, Seattle WA
        </h2>
        <p className='mt-1.5 text-wrap text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum aut
          reiciendis, assumenda minus commodi quod laborum.
        </p>
      </div>
    </Link>
  )
}

export default ArticleCard3
