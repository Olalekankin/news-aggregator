import { Helmet } from 'react-helmet'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/BreadCrumb'
import Filter from '../../components/Filter'
import SearchResult from './SearchResult'
import { useArticles } from '../../context/ArticlesContext'

const Search = () => {
  const breadcrumbLinks = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '`' },
  ]
  const { fetchSources, fetchAuthors } = useArticles()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  // Function to update URL with new filters
  const updateFilters = (newFilters: Record<string, string | null>) => {
    const updatedParams = new URLSearchParams(searchParams)

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value)
      } else {
        updatedParams.delete(key) 
      }
    })

    navigate(`/search?${updatedParams.toString()}`)
  }

  return (
    <>
      <Helmet>
        <title>Search - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className='px-4 lg:px-0'>
        <Breadcrumb links={breadcrumbLinks} />
        <div>
          {/* Pass updateFilters function to Filter */}
          <Filter
            updateFilters={updateFilters}
            fetchSources={fetchSources}
            fetchAuthors={fetchAuthors}
          />
        </div>
        <div className='lg:my-20'>
          <SearchResult />
        </div>
      </div>
    </>
  )
}

export default Search
