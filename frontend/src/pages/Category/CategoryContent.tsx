import React from 'react'
import ArticleCard from '../../components/ArticleCard'
import NewsSectionTitle from '../../components/NewsSectionTitle'

// Define the type for articles
interface Article {
  articleId: string
  preferenceData: string[]
  isAuthenticated: boolean
  layoutStyle: string
}

const CategoryContent: React.FC = () => {
  // Strictly typed articles array
  const articles: Article[] = Array.from({ length: 8 }, (_, index) => ({
    articleId: `article-${index + 1}`, // Unique ID for each article
    preferenceData: ['Politics'], // Example category for all articles
    isAuthenticated: false, // Example authentication state
    layoutStyle: 'portrait', // Layout style for all articles
  }))

  return (
    <>
      <section className='px-4 lg:px-0'>
        <div>
          <NewsSectionTitle title='Category' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 '>
          {articles.map((article) => (
            <ArticleCard
              key={article.articleId} // Unique key for each item in the loop
              articleId={article.articleId}
              preferenceData={article.preferenceData}
              isAuthenticated={article.isAuthenticated}
              layoutStyle={article.layoutStyle}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default CategoryContent
