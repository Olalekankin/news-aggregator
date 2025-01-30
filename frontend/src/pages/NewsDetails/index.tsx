import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/BreadCrumb'
import { Img } from '../../components/Img'
import ArticleCard3 from '../../components/ArticleCard3'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { IoCalendarClearOutline, IoFolderOutline } from 'react-icons/io5'
import { BsBriefcase } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useArticles } from '../../context/ArticlesContext'
import { formatDateString } from '../../utilis/formatDate'
import OtherNews from '../../components/OtherNewsSection'

// Define the type for a breadcrumb link
interface BreadcrumbLink {
  label: string
  href: string
}

const NewsDetails = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Article', href: '#' },
  ]

  const { id } = useParams<{ id: string }>()
  const { articles, singleArticle, fetchArticleById, fetchArticles } =
    useArticles()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch single article by ID using URL parameter
  useEffect(() => {
    if (id) {
      setLoading(true)
      fetchArticleById(Number(id))
        .catch(() => setError('Failed to load the article. Please try again.'))
        .finally(() => setLoading(false))
    }
  }, [id, fetchArticleById])

  // Fetch all articles once when component mounts
  useEffect(() => {
    fetchArticles()
    console.log(articles)
  }, [fetchArticles])

  return (
    <>
      <Helmet>
        <title>Article details - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className='px-4 lg:px-0'>
        <Breadcrumb links={breadcrumbLinks} />

        <div className='lg:my-20'>
          <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 lg:col-s'>
            {/* Article Details */}
            <div className='lg:col-span-3'>
              {loading ? (
                <p className='text-center text-gray-600'>Loading article...</p>
              ) : error ? (
                <p className='text-center text-red-500'>{error}</p>
              ) : singleArticle ? (
                <div>
                  <div className='lg:bg-gray-200 max-h-[280px]'>
                    <h2 className='text-lg lg:text-2xl font-medium mb-4 p-3'>
                      {singleArticle.title}
                    </h2>
                    <div className='w-full lg:w-[calc(100%-6%)] top-16 bg-cover bg-center h-[250px] lg:h-[260px] mx-auto'>
                      <Img
                        src={singleArticle.image_url}
                        className='w-full h-full object-cover object-center'
                      />
                    </div>
                  </div>

                  <div className='mt-32'>
                    <div className='flex items-center justify-between md:justify-center space-x-4 lg:space-x-10 xl:space-x-16'>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <IoCalendarClearOutline />
                        <span className='text-xs md:text-sm'>
                          {formatDateString(singleArticle.published_at)}
                        </span>
                      </div>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <BsBriefcase />
                        <span className='text-xs md:text-sm'>
                          {singleArticle.source}
                        </span>
                      </div>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <IoFolderOutline />
                        <div className='flex items-center space-x-0.5'>
                          <span className='text-xs md:text-sm'>Category:</span>
                          <span className='text-xs md:text-sm'>
                            {singleArticle.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4'>
                      {singleArticle.description
                        .split('\n\n') // Split into paragraphs
                        .map((para, index) => (
                          <p className='mt-3' key={index}>
                            <p>{para}</p>
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className='text-center text-gray-600'>Article not found.</p>
              )}
            </div>

            {/* Latest News Section */}
            <div className='bg-rose-50 py-5 min-h-[850px]'>
              <NewsSectionTitle title='Latest news' />
              <OtherNews />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsDetails
