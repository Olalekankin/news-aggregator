import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/ArticlesContext'

type CategoryProp = {
  categoryName: string
  label: string
  image: string
}

const CategoryTab: React.FC<CategoryProp> = ({ image, label }) => {
  const { fetchCategories } = useArticles() 
  const navigate = useNavigate()

  const handleCategoryClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const selectedLabel = (event.target as HTMLElement).innerText.trim() // Get clicked text

    if (selectedLabel) {
      fetchCategories(selectedLabel) // Use label text for query
      navigate(`/category/${selectedLabel}`) // Navigate with label as param
    }
  }

  return (
    <div
      onClick={handleCategoryClick}
      className='cursor-pointer w-40 h-11 rounded-xl flex justify-center items-center bg-cover bg-center relative overflow-hidden'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='absolute inset-0 bg-black opacity-50 backdrop-blur-lg'></div>
      <label className='text-white font-semibold text-base z-10'>
        {label}
      </label>
    </div>
  )
}

export default CategoryTab
