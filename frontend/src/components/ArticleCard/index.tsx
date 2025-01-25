import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'
import axios from 'axios'
import AddToPreference from '../AddToPreference'

type ArticleCardProp = {
  articleId: string
  preferenceData: string[] // Array of user preferences
  isAuthenticated: boolean // User authentication status
  layoutStyle?: 'portrait' | 'landscape' // New prop for layout style
}

const ArticleCard: React.FC<ArticleCardProp> = ({
  articleId,
  preferenceData,
  isAuthenticated,
  layoutStyle = 'portrait', // Conditional styling for a different layout
}) => {
  const [preferences, setPreferences] = useState(preferenceData)

  const handleSavePreference = async (category: string) => {
    try {
      const response = await axios.post('/api/preference', { category })
      if (response.status === 200) {
        setPreferences((prev) => [...prev, category])
      }
    } catch (error) {
      console.error('Failed to save preference:', error)
    }
  }

  // Define styling for portrait and landscape layouts
  const containerStyle =
    layoutStyle === 'portrait'
      ? 'block'
      : ' grid grid-cols-2 gap-4'

  return (
    <div className={`p-2 md:p-4 bg-white shadow-md w-full ${containerStyle}`}>
      <div className={layoutStyle === 'landscape' ? 'h-full' : 'flex-1 mt-2'}>
        <Link to={`/article/${articleId}`} className='h-full'>
          <div className='w-full h-full bg-cover bg-center'>
            <Img src='assets/card.png' className='w-full h-full' />
          </div>
        </Link>
      </div>
      <div className={layoutStyle === 'landscape' ? 'flex flex-col justify-between': ''}>
        <div className='w-full '>
          <div>
            <h2 className='py-1.5 text-sm font-medium text-[#3E3232]'>
              Opening Day of Boating Season, Seattle WA
            </h2>
            <p className='py-1.5 text-sm font-normal'>
              Of course the Puget Sound is very watery, and where there is
              water, there are boats.
            </p>
          </div>
        </div>
        <div>
          <div className='text-sm font-medium text-[#616060] flex justify-between mt-2'>
            <AddToPreference
              category='Politics'
              preferenceData={preferences}
              isAuthenticated={isAuthenticated}
              onSavePreference={handleSavePreference}
            />
            <span className=''>BBC</span>
          </div>
          <div className='py-2  bg-[#F5F5F5] rounded-md w-full flex items-center justify-between mt-2'>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
