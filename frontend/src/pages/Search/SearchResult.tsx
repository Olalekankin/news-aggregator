import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { useArticles } from '../../context/ArticlesContext'

const SearchResult: React.FC = () => {
  const { articles, searchArticles } = useArticles() // Get search function from context
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || '' // Get keyword from URL

  useEffect(() => {
    if (keyword) {
      searchArticles(keyword) // Fetch search results
    }
  }, [keyword, searchArticles]) // Re-run when keyword changes

  return (
    <section className='px-4 lg:px-0'>
      {/* Section Title */}
      <NewsSectionTitle title={`Search results for "${keyword}"`} />

      {/* No Results Found */}
      {articles.length === 0 && (
        <p className='text-gray-500 text-center mt-4'>No results found.</p>
      )}

      {/* Articles Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id.toString()}
            title={article.title}
            description={
              article.description?.split(' ').slice(0, 80).join(' ') +
              (article.description.split(' ').length > 80 ? '...' : '')
            }
            category={article.category}
            image_url={article.image_url}
            source={article.source}
            author={article.author}
            published_at={article.published_at}
          />
        ))}
      </div>
    </section>
  )
}

export default SearchResult
