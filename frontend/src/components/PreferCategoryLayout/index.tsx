
import { useNavigate } from 'react-router-dom'
import { useArticles } from '../../context/ArticlesContext'
import CategoryTab from '../Category'
import { useAuth } from '../../context/AuthContext'

export default function PreferredCategory() {
  const { fetchArticlesByQuery } = useArticles()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCategoryClick = async (category: string) => {
    await fetchArticlesByQuery({ category }) // Fetch only articles that match the category
    navigate(`/category/${category}`) // Navigate to category page
  }

  // to check preferred_categories exist before rendering
  if (!user || !user.preferences?.preferred_categories?.length) {
    return null 
  }

  return (
    <div className='py-2.5 bg-[#fc45087c] hidden lg:flex items-center space-x-6 mt-5 px-4 overflow-x-hidden'>
      {user.preferences.preferred_categories.map((category, index) => (
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
