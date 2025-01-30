import ArticleCard from '../ArticleCard'
import NewsSectionTitle from '../NewsSectionTitle'
import { useArticles } from '../../context/ArticlesContext'
import { truncateText } from '../../utilis/minimizeText'
import { formatDateString } from '../../utilis/formatDate'


export default function BreakingNewsSection() {

  const { articles } = useArticles()
  return (
    <div className='w-full bg-[#F5F5F5] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Breaking News' />
      <div className='w-full space-y-8'>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-4'>
          {articles.slice(20, 22).map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={truncateText(article.title, 150)}
              category={article.category}
              image_url={article.image_url}
              source={article.source}
              author={article.author}
              published_at={formatDateString(article.published_at)}
            />
          ))}
        </div>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4'>
          {articles.slice(4, 8).map((article) => (
            <ArticleCard
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
    </div>
  )
}
