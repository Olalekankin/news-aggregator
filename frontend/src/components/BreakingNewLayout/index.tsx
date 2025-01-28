import ArticleCard from '../ArticleCard'
import NewsSectionTitle from '../NewsSectionTitle'
import { Article } from '../../context/ArticlesContext'

interface BreakingNewsSectionProps {
  articles: Article[]
}

export default function BreakingNewsSection({
  articles,
}: BreakingNewsSectionProps) {
  return (
    <div className='w-full bg-[#F5F5F5] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Breaking News' />
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 order-2 md:order-1'>
          {articles.slice(0, 2).map((article) => (
            <ArticleCard
              key={article.id}
              articleId={article.id.toString()}
              title={article.title}
              description={article.description}
              category={article.category}
              image_url={article.image_url}
              source={article.source}
              author={article.author}
              published_at={article.published_at}
              layoutStyle='landscape'
            />
          ))}
        </div>
        <div className='order-1 md:order-2'>
          {articles.length > 2 && (
            <ArticleCard
              key={articles[2].id}
              articleId={articles[2].id.toString()}
              title={articles[2].title}
              description={articles[2].description}
              category={articles[2].category}
              image_url={articles[2].image_url}
              source={articles[2].source}
              author={articles[2].author}
              published_at={articles[2].published_at}
              layoutStyle='landscape'
            />
          )}
        </div>
      </div>
    </div>
  )
}
