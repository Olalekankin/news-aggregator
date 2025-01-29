import NewsSectionTitle from '../NewsSectionTitle'
import ArticleCard2 from '../ArticleCard2'
import { useArticles } from '../../context/ArticlesContext'


export default function PopularNewsSection() {
  const { articles } = useArticles()

  return (
    <div className='w-full bg-[#efecec] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Popular News' />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 mt-5'>
        {articles.slice(0, 4).map((article) => (
          <ArticleCard2
            key={article.id}
            id={article.id.toString()}
            title={article.title}
            description={article.description}
            image_url={article.image_url}
            category={article.category}
            published_at={article.published_at}
          />
        ))}
      </div>
    </div>
  )
}
