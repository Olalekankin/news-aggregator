import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard'
import NewsSectionTitle from '../../components/NewsSectionTitle'
import { useArticles } from '../../context/ArticlesContext'

const SearchResult: React.FC = () => {
  const { searchResults, searchArticles } = useArticles()
  const [searchParams] = useSearchParams()

  // Extract search parameters
  const keyword = searchParams.get('keyword') || ''
  const source = searchParams.get('source') || ''
  const published_at = searchParams.get('published_at') || ''
  const author = searchParams.get('author') || ''

  useEffect(() => {
    if (keyword || source || published_at || author) {
      // Log the parameters being passed to the search function
      console.log('Search Parameters:', {
        keyword,
        source,
        published_at,
        author,
      })

      // Call the searchArticles function
      searchArticles(keyword, { source, published_at, author })
    }
  }, [keyword, source, published_at, author, searchArticles])

  // Log the search results when they are updated
  useEffect(() => {
    if (searchResults) {
      console.log('Search Results:', searchResults)
    }
  }, [searchResults])

  return (
    <section className='lg:px-0'>
      {/* Section Title */}
      <div className='mt-4'>
        <NewsSectionTitle title={`Search results for "${keyword}"`} />
      </div>

      {/* No Results Found */}
      {searchResults.length === 0 && (
        <p className='text-gray-500 text-center mt-4'>No results found.</p>
      )}

      {/* Articles Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {searchResults.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id.toString()}
            title={article.title}
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
