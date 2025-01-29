import React, { useState } from 'react'
import { useArticles } from '../../context/ArticlesContext'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

type SearchBoxProps = {
  placeholder?: string
  className?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  className = '',
}) => {
  const [keyword, setKeyword] = useState('')
  const { searchArticles } = useArticles() // Access context function
  const navigate = useNavigate() // Hook for navigation

  // Handle search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent page reload
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) return // Prevent empty searches

    await searchArticles(trimmedKeyword) // Fetch search results
    navigate(`/search?keyword=${encodeURIComponent(trimmedKeyword)}`) // Redirect to search page
  }

  return (
    <form onSubmit={handleSearch} className={`relative w-full ${className}`}>
      {/* Input Field */}
      <input
        type='text'
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className='pl-10 pr-4 py-2 w-full border border-gray-300 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500'
      />
      {/* Search Button */}
      <button
        type='submit'
        className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
      >
        <IoSearch />
      </button>
    </form>
  )
}

export { SearchBox }
