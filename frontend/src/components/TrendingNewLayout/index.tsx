import { useArticles } from '../../context/ArticlesContext'
import { formatDateString } from '../../utilis/formatDate'
import { truncateText } from '../../utilis/minimizeText'
import ArticleCard from '../ArticleCard'
import ArticleCard6 from '../ArticleCard6'
import NewsSectionTitle from '../NewsSectionTitle'

export default function TrendingSection() {
  const { articles } = useArticles()
  return (
    <div className='w-full bg-white lg:py-8 py-4 px-4'>
      <NewsSectionTitle title='Trending News' />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5'>
        {articles.slice(5, 25).map((article) => (
          <ArticleCard6
            key={article.id}
            id={article.id}
            title={article.title}
            description={truncateText(article.description, 200)}
            category={article.category}
            image_url={article.image_url}
            source={article.source}
            author={article.author}
            published_at={formatDateString(article.published_at)}
          />
        ))}
      </div>
    </div>
  )
}
