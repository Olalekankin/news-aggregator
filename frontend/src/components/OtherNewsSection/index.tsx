import { useEffect } from 'react'
import { useArticles } from '../../context/ArticlesContext'
import { formatDateString } from '../../utilis/formatDate'
import { truncateText } from '../../utilis/minimizeText'
import ArticleCard4 from '../ArticleCard4'

export default function OtherNews() {
  const { articles, fetchArticles } = useArticles()

  // Fetch all articles once when component mounts
  useEffect(() => {
    fetchArticles()
    console.log(articles)
  }, [fetchArticles])
  return (
    <div className='mt-5 flex flex-col space-y-6 px-4'>
      {articles.length > 0 ? (
        articles.slice(1, 7).map((article) => (
          <div key={article.id}>
            <ArticleCard4
              key={article.id}
              id={article.id}
              title={article.title}
              description={truncateText(article.description, 150)}
              category={article.category}
              image_url={article.image_url}
              source={article.source}
              author={article.author}
              published_at={formatDateString(article.published_at)}
            />
          </div>
        ))
      ) : (
        <p className='text-center text-gray-600'>No latest news available.</p>
      )}
    </div>
  )
}
