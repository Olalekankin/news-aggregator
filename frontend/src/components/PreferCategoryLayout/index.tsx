import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/ArticlesContext'
import CategoryTab from '../Category'

export default function PreferredCategory() {
  const { fetchCategories, fetchArticlesByQuery } = useArticles()
  const [fetchedCategories, setFetchedCategories] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadCategories = async () => {
      const categories = await fetchCategories()
      setFetchedCategories(categories)
    }
    loadCategories()
  }, [fetchCategories])

  const handleCategoryClick = async (category: string) => {
    await fetchArticlesByQuery({ category }) // Fetch only articles that match the category
    console.log('Hey')
    navigate(`/category/${category}`) // Navigate to category page
  }

  return (
    <div className='py-2.5 bg-[#fc45087c] hidden lg:flex items-center space-x-6 mt-5 px-4 overflow-x-hidden'>
      {fetchedCategories.map((category, index) => (
        <CategoryTab
          key={index}
          label={category}
          image={`assets/${category.toLowerCase()}.png`} // Dynamic image
          onClick={() => handleCategoryClick(category)} // Handle click event
        />
      ))}
    </div>
  )
}
