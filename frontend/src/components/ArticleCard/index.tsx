import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'
import { Button } from '../Button'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios'

type ArticleCardProp = {
  articleId: string
}

const ArticleCard: React.FC<ArticleCardProp> = ({ articleId }) => {
  const [like, setLike] = useState(false)

  // Function to handle the like button click
  const handleLikeToggle = async () => {
    try {

      await axios.post(`/api/articles/${articleId}/like`, { like: !like })
      setLike(!like)
    } catch (error) {
      console.error('Failed to update like state:', error)
    }
  }

  return (
    <Link to={`/article/${articleId}`} className=''>
      <div className='p-2 md:p-4 bg-white shadow-md'>
        <div className='w-full bg-cover bg-center'>
          <Img src='assets/card.png' className='w-full' />
        </div>
        <div>
          <div className='text-xs font-light text-[#616060] flex justify-between mt-2'>
            <span className=''>Politics</span>
            <span className=''>BBC</span>
          </div>
          <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>
            Opening Day of Boating Season, Seattle WA
          </h2>
          <p className='py-1.5 text-sm font-normal'>
            Of course the Puget Sound is very watery, and where there is water,
            there are boats.
          </p>
        </div>
        <div className='py-2 px-2 md:px-4 bg-[#F5F5F5] rounded-md p-1 w-full flex items-center justify-between'>
          <div className='flex space-x-3 items-center'>
            <div className='size-11 bg-cover bg-center rounded-md '>
              <Img src='assets/profile.png' className='' />
            </div>
            <div>
              <p className='font-medium text-sm text-[#3E3232]'>James</p>
              <p className='font-normal text-xs text-[#3E3232BF] mt-1'>
                August 18, 2022
              </p>
            </div>
          </div>
          <div className=''>
            {!like ? (
              <Button onClick={handleLikeToggle} className='text-gray-500'>
                <FaRegHeart />
              </Button>
            ) : (
              <Button onClick={handleLikeToggle} className='text-red-500'>
                <FaHeart />
                Liked
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
