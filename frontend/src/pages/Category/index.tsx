import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useArticles } from '../../context/ArticlesContext'
import CategoryTab from '../../components/Category'
import CategoryContent from './CategoryContent'
import { Helmet } from 'react-helmet'

const categories = [
  { label: 'Technology', image: '/images/tech.jpg' },
  { label: 'Sports', image: '/images/sports.jpg' },
  { label: 'Politics', image: '/images/politics.jpg' },
  { label: 'Health', image: '/images/health.jpg' },
]

const Categories: React.FC = () => {
  const { fetchArticlesByQuery, filteredArticles } = useArticles()
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')

  // Fetch articles when category changes
  useEffect(() => {
    console.log('mount')
    if (category) {
      fetchArticlesByQuery({ category })
    }
  }, [category, fetchArticlesByQuery])

  

  return (
    <>
      <Helmet>
        <title>Category - Search by category</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <section>
        <CategoryContent articles={filteredArticles} category={category} />
      </section>
    </>
  )
}

export default Categories
