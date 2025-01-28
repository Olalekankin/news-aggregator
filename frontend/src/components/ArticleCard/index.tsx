import { Link } from "react-router-dom"
import { Img } from "../Img"

type ArticleCardProp = {
  articleId: string
  title: string
  description: string
  category: string
  image_url: string
  source: string
  author: string
  published_at: string
  layoutStyle?: 'portrait' | 'landscape' 
}

const ArticleCard: React.FC<ArticleCardProp> = ({
  articleId,
  title,
  description,
  category,
  image_url,
  source,
  author,
  published_at,
  layoutStyle = 'portrait', 
}) => {

  // Define styling for portrait and landscape layouts
  const containerStyle =
    layoutStyle === 'portrait' ? 'block' : ' grid grid-cols-2 gap-4'

  return (
    <div className={`p-2 md:p-4 bg-white shadow-md w-full ${containerStyle}`}>
      <div className={layoutStyle === 'landscape' ? 'h-full' : 'flex-1 mt-2'}>
        <Link to={`/${articleId}`} className='h-full'>
          <div className='w-full h-full bg-cover bg-center'>
            <Img src={image_url} className='w-full h-full' />
          </div>
        </Link>
      </div>
      <div
        className={
          layoutStyle === 'landscape' ? 'flex flex-col justify-between' : ''
        }
      >
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
            <div className='flex space-x-3 items-center'>
              <div>
                <p className='font-medium text-sm text-[#3E3232]'>{author}</p>
                <p className='font-normal text-xs text-[#3E3232BF] mt-1'>
                  {published_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
