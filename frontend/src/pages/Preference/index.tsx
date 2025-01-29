import React, { useEffect } from 'react'
import PreferenceForm from '../../components/PreferenceForm'
import { Img } from '../../components/Img'
import { Helmet } from 'react-helmet'
import { useArticles } from '../../context/ArticlesContext'
import { useAuth } from '../../context/AuthContext'

const Preference: React.FC = () => {
    const { articles, fetchArticles } = useArticles()
  const { isAuthenticated, user } = useAuth()
    // Fetch articles when the component mounts
    useEffect(() => {
      fetchArticles()
    }, [fetchArticles])

  return (
    <>
      <Helmet>
        <title>Preference setting page - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div className='px-4'>
        <div className='flex items-center justify-center lg:space-x-10'>
          <div className='hidden lg:inline h-[300px]'>
            <Img
              src='assets/card.png'
              className='object-cover object-center h-full'
            />
          </div>
          <div className='w-full lg:w-auto'>
            <div className='mb-4'>
              <h2 className='text-lg font-semibold text-center lg:text-left'>
                Welcome
              </h2>
              <p className='text-sm text-gray-600 text-center lg:text-left'>
                To serve you the best of news, kindly select the category of
                news
              </p>
            </div>
            <PreferenceForm
              articles={articles}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Preference
