import { Link } from 'react-router-dom'
import { Img } from '../Img'

type ArticleCardProp4 = {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  source: string
  author: string
  published_at: string
}

const ArticleCard4: React.FC<ArticleCardProp4> = ({
  id,
  title,
  image_url,
  source,
  author,
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

export default ArticleCard4
