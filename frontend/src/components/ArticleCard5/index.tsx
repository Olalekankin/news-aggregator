import { Link } from 'react-router-dom'
import { Img } from '../Img'

type ArticleCardProp5 = {
  id: number
  title: string
  category: string
  image_url: string
  source: string
}

const ArticleCard5: React.FC<ArticleCardProp5> = ({
  id,
  title,
  image_url,
  source,
  category,
}) => {
  return (
    <div className='p-2 md:p-4 bg-white h-full shadow-md w-full'>
      <Link to={`/article/${id}`} className='flex flex-col'>
        <div className=''>
          <div className='w-full h-full bg-cover bg-center '>
            <Img
              src={image_url}
              className='w-full h-[300px] object-cover object-center'
            />
          </div>
        </div>
        <div className=''>
          <div className='w-full '>
            <div>
              <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>
                {title}
              </h2>
            </div>
          </div>
          <div>
            <div className='text-sm font-medium text-[#616060] flex justify-between mt-2'>
              <span className='text-sm font-medium text-[#616060]'>
                {category}
              </span>
              <span>{source}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ArticleCard5
