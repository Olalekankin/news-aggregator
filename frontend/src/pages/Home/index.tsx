import React from 'react'
import { Helmet } from 'react-helmet'
import PreferredCategory from '../../components/PreferCategoryLayout'
import BreakingNewsSection from '../../components/BreakingNewLayout'
import PopularNewsSection from '../../components/PopularNewsLayout'
import TrendingSection from '../../components/TrendingNewLayout'

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='Your best news aggregator from popular source like bbc , cnn, abc' />
      </Helmet>
      <div className='w-full'>
        <div className=''>
          <PreferredCategory />
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

export default Home
