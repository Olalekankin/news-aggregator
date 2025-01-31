import React, { useEffect, useRef, useState } from 'react'
import BreakingNewsSection from '../../components/BreakingNewLayout'
import TrendingSection from '../../components/TrendingNewLayout'
import PopularNewsSection from '../../components/PopularNewsLayout'
import { Helmet } from 'react-helmet'
import { useArticles } from '../../context/ArticlesContext'
import PreferredCategory from '../../components/PreferCategoryLayout'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { truncateText } from '../../utilis/minimizeText'
import { formatDateString } from '../../utilis/formatDate'
import ArticleCard5 from '../../components/ArticleCard5'
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6'

const Home: React.FC = () => {
  const {
    articles,
    fetchArticles,
    personalizedArticles,
    fetchPersonalizedArticle,
    loading,
  } = useArticles()

  useEffect(() => {
    fetchArticles()
    fetchPersonalizedArticle()
  }, [fetchArticles, fetchPersonalizedArticle])

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollBy = 330 

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollBy,
        behavior: 'smooth',
      })
      setCurrentIndex((prev) =>
        prev === 0 ? personalizedArticles.length - 1 : prev - 1
      )
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollBy,
        behavior: 'smooth',
      })
      setCurrentIndex((prev) =>
        prev === personalizedArticles.length - 1 ? 0 : prev + 1
      )
    }
  }

  useEffect(() => {
    if (!scrollContainerRef.current || personalizedArticles.length === 0) return

    const interval = setInterval(() => {
      scrollRight()
    }, 0.5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [personalizedArticles])

  if (loading) {
    return <div className='text-center py-4'>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <title>Home - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div className='w-full'>
        <PreferredCategory />
        <div className='w-full bg-[#F5F5F5] lg:py-8 py-4'>
          <NewsSectionTitle title='Your Stories' />
          <div className='w-full space-y-8'>
            {personalizedArticles.length > 0 ? (
              <div className='relative w-full space-y-8'>
                <div
                  ref={scrollContainerRef}
                  className='flex gap-4 overflow-x-hidden scroll-smooth'
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {personalizedArticles.map((article) => (
                    <div
                      key={article.id}
                      className='min-w-[300px] max-w-[350px] flex-shrink-0'
                    >
                      <ArticleCard5
                        id={article.id}
                        title={truncateText(article.title, 20)}
                        category={article.category}
                        image_url={article.image_url}
                        source={article.source}
                        author={article.author}
                        published_at={formatDateString(article.published_at)}
                      />
                    </div>
                  ))}
                </div>

                <div className='absolute top-1/2 left-0 transform -translate-y-1/2'>
                  <button
                    className='p-3 bg-orange-500 text-white rounded-full shadow-md'
                    onClick={scrollLeft}
                  >
                    <FaCircleChevronLeft />
                  </button>
                </div>
                <div className='absolute top-1/2 -right-3 transform -translate-y-1/2'>
                  <button
                    className='p-3 bg-orange-500 text-white rounded-full shadow-md'
                    onClick={scrollRight}
                  >
                    <FaCircleChevronRight className='' />
                  </button>
                </div>
              </div>
            ) : (
              <div className='text-center text-gray-600'>
                No personalized articles available.
              </div>
            )}
          </div>
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
