import { useArticles } from '../../context/ArticlesContext'
import ArticleCard from '../ArticleCard'
import NewsSectionTitle from '../NewsSectionTitle'

export default function LatestNews() {
  const { articles } = useArticles() 

  return (
    <div className='w-full bg-[#f7f8fa] px-4 lg:py-8 py-4'>
      <NewsSectionTitle title='Latest News' />
      <div className='w-full mt-5'>
        <div className='grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4'>
          {articles.slice(5, 10).map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id.toString()}
              title={article.title}
              description={article.description}
              category={article.category}
              image_url={article.image_url}
              source={article.source}
              author={article.author}
              published_at={article.published_at}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
