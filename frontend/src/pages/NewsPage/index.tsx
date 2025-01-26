import React from 'react'
import CategoryCap from './CategoryCap'
import BreakingNewsSection from './BreakingNewsSection'
import TrendingSection from './TrendingSection'
import PopularNewsSection from './PopularNewsSection'
import {Helmet} from 'react-helmet'

const NewsPageIndex: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div className='w-full'>
        <div className=''>
          <CategoryCap />
        </div>
        <div>
          <BreakingNewsSection />
        </div>
        <div className='border-t'>
          <PopularNewsSection />
        </div>
        <div className='mb-8 lg:mb-20'>
          <TrendingSection />
        </div>
      </div>
    </>
  )
}

export default NewsPageIndex
