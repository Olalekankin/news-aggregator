import { Helmet } from 'react-helmet'
import Breadcrumb from '../../components/BreadCrumb'
import Filter from '../../components/Filter'
import SearchResult from './SearchResult'

const Search = () => {
  const breadcrumbLinks = [
    { label: 'Home', href: '/' },
    { label: 'search', href: '`' },
  ]
  const handleFilterData = (filter: {
    type: 'date' | 'source'
    value: string
  }) => {
    console.log('Filter applied:', filter)
  }

  const sources = ['BBC', 'CNN', 'Reuters', 'Al Jazeera', 'The Guardian']
  return (
    <>
      <Helmet>
        <title>Search - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className=''>
        <Breadcrumb links={breadcrumbLinks} />
        <div>
          <Filter filterData={handleFilterData} sources={sources} />
        </div>
        <div className='lg:my-20'>
          <SearchResult />
        </div>
      </div>
    </>
  )
}

export default Search
