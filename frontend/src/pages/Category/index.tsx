import { Helmet } from 'react-helmet'
import LoginForm from '../../components/LoginForm'
import Breadcrumb from '../../components/BreadCrumb'
import Filter from '../../components/Filter'
import CategoryContent from './CategoryContent'

const Category = () => {
   const breadcrumbLinks = [
     { label: 'Home', href: '/' },
     { label: 'category', href: '`' },
   ]
   const handleFilterData = (filter: {
     type: 'date' | 'source'
     value: string
   }) => {
     console.log('Filter applied:', filter)
     // Implement your filtering logic here
   }

  const sources = ['BBC', 'CNN', 'Reuters', 'Al Jazeera', 'The Guardian']
  return (
    <>
      <Helmet>
        <title>Sign-in - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className=''>
        <Breadcrumb links={breadcrumbLinks} />
        <div>
          <Filter filterData={handleFilterData} sources={sources} />
        </div>
        <div className='lg:my-20'>
          <CategoryContent/>
        </div>
      </div>
    </>
  )
}

export default Category
