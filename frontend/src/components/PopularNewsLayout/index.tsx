import NewsSectionTitle from '../NewsSectionTitle'
import ArticleCard2 from '../ArticleCard2'
import { useArticles } from '../../context/ArticlesContext'
import { truncateText } from '../../utilis/minimizeText'
import { formatDateString } from '../../utilis/formatDate'


export default function PopularNewsSection() {
  const { articles } = useArticles()

  return (
    <div className='w-full bg-[#efecec] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Popular News' />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 mt-5'>
        {articles.slice(0, 4).map((article) => (
          <ArticleCard2
            key={article.id}
            id={article.id}
            title={article.title}
            description={truncateText(article.description, 25)}
            image_url={article.image_url}
            category={article.category}
            published_at={formatDateString(article.published_at)}
          />
        ))}
      </div>
    </div>
  )
}
