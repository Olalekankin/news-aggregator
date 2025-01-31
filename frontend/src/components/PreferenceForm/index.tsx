import { useEffect, useState } from 'react'
import Form from '../Form'
import { Article } from '../../context/ArticlesContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface PrefProps {
  articles: Article[]
  isAuthenticated: boolean
}

const PreferenceForm = ({ articles }: PrefProps) => {
  useEffect(() => {
    fetchAndFilterArticles()
  }, [articles])

  const API_URL = import.meta.env.VITE_API_URL 
  // States for unique values
  const [categories, setCategories] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])

  // Loading state
  const [loading, setLoading] = useState(false)
  // Selected preferences
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const navigate = useNavigate()

  // Function to reduce an array to a specified number of elements
  const limitArraySize = <T,>(array: T[], limit: number): T[] => {
    return array.slice(0, limit)
  }

  // Fetch and filter articles to get unique categories, authors, and sources
  const fetchAndFilterArticles = () => {
    const categorySet = new Set<string>()
    const authorSet = new Set<string>()
    const sourceSet = new Set<string>()

    articles.forEach((article) => {
      if (article.category) categorySet.add(article.category)
      if (article.author) {
        const authorName = article.author.split(' ').slice(0, 3).join(' ')
        authorSet.add(authorName)
      }
      if (article.source) sourceSet.add(article.source)
    })

    setCategories(limitArraySize([...categorySet], 10)) 
    setAuthors(limitArraySize([...authorSet], 10))
    setSources(limitArraySize([...sourceSet], 10))
  }

  // Toggle selection functions
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    )
  }

  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((src) => src !== source)
        : [...prev, source]
    )
  }

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((src) => src !== author)
        : [...prev, author]
    )
  }

  // Handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    const requestBody = {
      preferred_sources: selectedSources,
      preferred_categories: selectedCategories,
      preferred_authors: selectedAuthors,
    }

    setLoading(true)

    try {
      console.log('Submitting preferences with token:', token)
      const response = await axios.post(
        `${API_URL}/preferences`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200 || response.status === 201) {
        console.log('Preferences saved successfully!')
        navigate('/sign-in')
      } else {
        console.log('Failed to save preferences.')
      }
    } catch (error) {
      console.error('Error submitting preferences:', error.response || error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        buttonText='Save Preference'
        className='px-4 md:px-6'
      >
        {/* Categories Section */}
        <div>
          <p className='text-base font-medium'>
            Select your preferred categories
          </p>
          <div className='mt-4 flex flex-wrap gap-3'>
            {categories.map((category) => (
              <button
                type='button'
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  selectedCategories.includes(category)
                    ? 'bg-[#fc4508df] text-white border-[#FC4308]'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } transition hover:bg-[#fc4508df] hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sources Section */}
        <div className='mt-10'>
          <p className='text-base font-medium'>Select preferred news sources</p>
          <div className='mt-4 flex flex-wrap gap-3'>
            {sources.map((source) => (
              <button
                type='button'
                key={source}
                onClick={() => toggleSource(source)}
                className={`px-4 py-2 rounded-full w-max border text-sm ${
                  selectedSources.includes(source)
                    ? 'bg-[#fc4508df] text-white border-[#FC4308]'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } transition hover:bg-[#fc4508df] hover:text-white`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>

        {/* Author Section */}
        <div className='mt-10'>
          <p className='text-base font-medium'>Select your preferred authors</p>
          <div className='mt-4 flex flex-wrap gap-3'>
            {authors.map((author) => (
              <button
                type='button'
                key={author}
                onClick={() => toggleAuthor(author)}
                className={`px-4 py-2 rounded-full border w-max text-sm ${
                  selectedAuthors.includes(author)
                    ? 'bg-[#fc4508df] text-white border-[#FC4308]'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } transition hover:bg-[#fc4508df] hover:text-white`}
              >
                {author}
              </button>
            ))}
          </div>
        </div>
      </Form>

      <div className='flex w-full justify-center'>
        {loading && <span className='loader mt-6'></span>}
      </div>
    </>
  )
}

export default PreferenceForm
