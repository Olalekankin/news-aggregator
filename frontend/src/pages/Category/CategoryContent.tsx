import React from 'react'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import ArticleCard from '../../components/ArticleCard'
import { Article } from '../../context/ArticlesContext'
import { GoDotFill } from 'react-icons/go'
import { truncateText } from '../../utilis/minimizeText'

interface CategoryContentProps {
  articles: Article[] // Receive fetched articles from parent
  category: string | null
}

const CategoryContent: React.FC<CategoryContentProps> = ({
  articles,
  category,
}) => {
  return (
    <section className='px-4 lg:px-0'>
      <div>
        <div className='flex items-center space-x-3'>
          <GoDotFill className='text-red-500' />
          <h3 className='text-lg font-medium text-gray-800'>{`Category`}</h3>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id.toString()}
              title={article.title}
              description={truncateText(article.description, 80)}
              category={article.category}
              image_url={article.image_url}
              source={article.source}
              author={article.author}
              published_at={article.published_at}
            />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500'>
            No articles found for this category.
          </p>
        )}
      </div>
    </section>
  )
}

export default CategoryContent
