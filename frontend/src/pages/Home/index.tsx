import React, { useEffect } from 'react'
import BreakingNewsSection from '../../components/BreakingNewLayout'
import TrendingSection from '../../components/TrendingNewLayout'
import PopularNewsSection from '../../components/PopularNewsLayout'
import { Helmet } from 'react-helmet'
import { useArticles } from '../../context/ArticlesContext'
import PreferredCategory from '../../components/PreferCategoryLayout'

const Home: React.FC = () => {
  const { articles, fetchArticles } = useArticles()

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <>
      <Helmet>
        <title>Home - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div className='w-full'>
        <PreferredCategory/>
        <div className='pt-6'>
          <BreakingNewsSection />
        </div>
        <div className='border-t'>
          <PopularNewsSection />
        </div>
        <div className='mb-8 lg:mb-20'>
          <TrendingSection/>
        </div>
      </div>
    </>
  )
}

export default Home
