import { Link } from 'react-router-dom'
import { Img } from '../Img'

type ArticleCardProp6 = {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  source: string
  author: string
  published_at: string
}

const ArticleCard6: React.FC<ArticleCardProp6> = ({
  id,
  title,
  description,
  category,
  image_url,
  source,
  author,
  published_at,
}) => {
  return (
    <div className='p-2 md:p-4 bg-white h-full shadow-md w-full'>
      <Link to={`/article/${id}`} className='flex space-x-4'>
        <div className=''>
          <div className='w-full h-full bg-cover bg-center '>
            <Img
              src={image_url}
              className='w-full  h-[200px] object-cover object-center'
            />
          </div>
        </div>
        <div className=''>
          <div className='w-full '>
            <div>
              <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>
                {title}
              </h2>
              <p className='py-1.5 text-sm font-normal'>{description}</p>
            </div>
          </div>
          <div>
            <div className='text-sm font-medium text-[#616060] flex justify-between mt-2'>
              <span className='text-sm font-medium text-[#616060]'>
                {category}
              </span>
              <span>{source}</span>
            </div>
            <div className='py-2  bg-[#F5F5F5] rounded-md w-full flex items-center justify-between mt-2'>
              <div className='w-full flex space-x-3 items-center'>
                <div className='w-full flex items-end justify-between'>
                  <p className='font-medium text-sm text-[#3E3232]'>{author}</p>
                  <p className='font-normal text-xs text-[#3E3232BF] mt-1'>
                    {published_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ArticleCard6
