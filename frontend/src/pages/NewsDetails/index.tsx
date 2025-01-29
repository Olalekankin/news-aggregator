import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/BreadCrumb'
import { Img } from '../../components/Img'
import ArticleCard3 from '../../components/ArticleCard3'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { IoCalendarClearOutline, IoFolderOutline } from 'react-icons/io5'
import { BsBriefcase } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useArticles } from '../../context/ArticlesContext'
import { formatDateString } from '../../utilis/formatDate'

// Define the type for an article
interface Article {
  id: number
  title: string
  description: string
  category: string
  image_url: string
  source: string
  author: string
  published_at: string
}

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

  const { articles, fetchArticles } = useArticles()
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
   const API_URL = import.meta.env.VITE_API_URL 

  const url = `${API_URL}/articles/${id}`

  // Fetch single article by id
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await axios.get(url)
        setArticle(response.data)
      } catch (err) {
        setError('Failed to load the article. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id]) // Only runs when `id` changes

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
              ) : article ? (
                <div>
                  <div className='lg:bg-gray-200 max-h-[250px]'>
                    <h2 className='text-lg lg:text-2xl font-medium mb-4 p-3'>
                      {article.title}
                    </h2>
                    <div className='w-full lg:w-[calc(100%-6%)] top-16 bg-cover bg-center h-[250px] lg:h-[260px] mx-auto'>
                      <Img
                        src={article.image_url}
                        className='w-full h-full object-cover object-center'
                      />
                    </div>
                  </div>

                  <div className='mt-32 md:mt-24'>
                    <div className='flex items-center justify-between md:justify-center space-x-4 lg:space-x-10 xl:space-x-16'>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <IoCalendarClearOutline />
                        <span className='text-xs md:text-sm'>
                          {formatDateString(article.published_at)}
                        </span>
                      </div>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <BsBriefcase />
                        <span className='text-xs md:text-sm'>
                          {article.source}
                        </span>
                      </div>
                      <div className='flex flex-col space-y-0.5 lg:space-y-0 lg:flex-row justify-center lg:items-center space-x-2'>
                        <IoFolderOutline />
                        <div className='flex items-center space-x-0.5'>
                          <span className='text-xs md:text-sm'>Category:</span>
                          <span className='text-xs md:text-sm'>
                            {article.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className='mt-4'>{article.description}</p>
                  </div>
                </div>
              ) : (
                <p className='text-center text-gray-600'>Article not found.</p>
              )}
            </div>

            {/* Latest News Section */}
            <div className='bg-rose-50 py-5 min-h-[850px]'>
              <NewsSectionTitle title='Latest news' />
              <div className='mt-5 flex flex-col space-y-6 px-4'>
                {articles?.length > 0 ? (
                  articles
                    .slice(20, 24)
                    .map((article) => (
                      <ArticleCard3
                        key={article.id}
                        id={article.id.toString()}
                        title={(article.title)}
                        image_url={article.image_url}
                        source={article.source}
                        author={article.author}
                      />
                    ))
                ) : (
                  <p className='text-center text-gray-600'>
                    No latest news available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsDetails
