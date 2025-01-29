import { useEffect, useState } from 'react'
import Form from '../Form'
import { Article } from '../../context/ArticlesContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface PrefProps {
  articles: Article[] 
  isAuthenticated: boolean
}

const PreferenceForm = ({ articles }: PrefProps) => {
  useEffect(() => {
    fetchAndFilterArticles()
  }, [articles])

  // Arrays to hold the unique values of categories, authors, and sources
  const [categories, setCategories] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])

  // loading state

  const [loading, setLoading] = useState(false)
  // Arrays to hold selected preferences
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  // Fetch and filter articles to get unique categories, authors, and sources
  const fetchAndFilterArticles = () => {
    const categorySet = new Set<string>()
    const authorSet = new Set<string>()
    const sourceSet = new Set<string>()

    articles.forEach((article) => {
      if (article.category) categorySet.add(article.category)
      if (article.author) {
        // Extract first 3 words from the author's name
        const authorName = article.author.split(' ').slice(0, 3).join(' ')
        authorSet.add(authorName)
      }
      if (article.source) sourceSet.add(article.source)
    })

    setCategories([...categorySet])
    setAuthors([...authorSet]) // Ensure the authors are unique
    setSources([...sourceSet])
  }
   const navigate = useNavigate()

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    )
  }

  // Toggle source selection
  const toggleSource = (source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((src) => src !== source)
        : [...prev, source]
    )
  }

  // Toggle author selection
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
      console.log('Submitting preferences with token:', token) // Debugging log
      const response = await axios.post(
        'http://127.0.0.1:8000/api/preferences',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      )

      if (response.status === 200 || response.status === 201) {
        console.log('Preferences saved successfully!')
        setLoading(false)
        navigate('/home')
      } else {
        console.log('Failed to save preferences.')
      }
    } catch (error) {
      console.error('Error submitting preferences:', error.response || error)
    } finally {
      setLoading(false)
    }
  }


  // Function to slice the data into groups of 5
  const sliceIntoChunks = (array: string[], size: number) => {
    const chunks: string[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  // Slice categories, sources, and authors into chunks of 5
  const categoryChunks = sliceIntoChunks(categories, 5)
  const sourceChunks = sliceIntoChunks(sources, 5)
  const authorChunks = sliceIntoChunks(authors, 5) 

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
          <div className='mt-4'>
            {categoryChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className='w-full flex flex-wrap space-x-3 space-y-3'
              >
                {chunk.map((category) => (
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
            ))}
          </div>
        </div>

        {/* Sources Section */}
        <div className='mt-10'>
          <p className='text-base font-medium'>Select preferred news sources</p>
          <div className='mt-4'>
            {sourceChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className='flex flex-wrap space-y-3 space-x-3'
              >
                {chunk.map((source) => (
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
            ))}
          </div>
        </div>

        {/* Author Section */}
        <div className='mt-10'>
          <p className='text-base font-medium'>Select your preferred authors</p>
          <div className='mt-4'>
            {authorChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className='flex flex-wrap space-x-3 space-y-3 gap-3'
              >
                {chunk.map((author) => (
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
