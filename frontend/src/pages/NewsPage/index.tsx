import React from 'react'
import Header from '../../components/Header'
import CategoryCap from './CategoryCap'
import BreakingNewsSection from './BreakingNewsSection'
import TrendingSection from './TrendingSection'
import PopularNewsSection from './PopularNewsSection'

const NewsPageIndex: React.FC = () => {
  return (
    <div className='py-4 lg:py-10 w-full'>
      <div className='px-4 lg:px-20'>
        <Header/>
        <CategoryCap />
      </div>
      <div>
        <BreakingNewsSection />
      </div>
      <div className='border-t'>
        <PopularNewsSection />
      </div>
      <div className=''>
        <TrendingSection />
      </div>
    </div>
  )
}

export default NewsPageIndex
