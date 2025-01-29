import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface FilterProps {
  updateFilters: (filters: Record<string, string | null>) => void
  fetchSources: () => Promise<string[]>
  fetchAuthors: () => Promise<string[]>
}

const Filter: React.FC<FilterProps> = ({
  updateFilters,
  fetchSources,
  fetchAuthors,
}) => {
  const [searchParams] = useSearchParams()
  const now = new Date().toISOString().split('T')[0]

  const [selectedDate, setSelectedDate] = useState<string | null>(
    searchParams.get('published_at')
  )
  const [selectedSource, setSelectedSource] = useState<string | null>(
    searchParams.get('source')
  )
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(
    searchParams.get('author')
  )

  const [sources, setSources] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setSources(await fetchSources())
        setAuthors(await fetchAuthors())
      } catch (error) {
        console.error('Error loading filters:', error)
        setSources([])
        setAuthors([])
      }
    }
    loadFilters()
  }, [fetchSources, fetchAuthors])

  const handleFilterChange = (key: string, value: string | null) => {
    if (key === 'published_at') setSelectedDate(value)
    if (key === 'source') setSelectedSource(value)
    if (key === 'author') setSelectedAuthor(value)

    updateFilters({ [key]: value }) 
  }

  return (
    <div className='flex items-center space-x-4 mt-5'>
      {/* Date Filter */}
      <input
        type='date'
        value={selectedDate || ''}
        onChange={(e) => handleFilterChange('published_at', e.target.value)}
        className='p-2 border rounded-md outline-0 border-[#FC4308] focus:ring-[#FC4308] bg-white w-24 lg:w-40 max-w-56'
      />

      {/* Source Filter */}
      <select
        value={selectedSource || ''}
        onChange={(e) => handleFilterChange('source', e.target.value)}
        className='p-2 border border-[#FC4308] outline-0 focus:ring-[#FC4308] rounded-md bg-white w-24 lg:w-40 max-w-56'
      >
        <option value=''>Select Source</option>
        {sources.length > 0 ? (
          sources.map((source, index) => (
            <option key={index} value={source}>
              {source}
            </option>
          ))
        ) : (
          <option disabled>Loading sources...</option>
        )}
      </select>

      {/* Author Filter */}
      <select
        value={selectedAuthor || ''}
        onChange={(e) => handleFilterChange('author', e.target.value)}
        className='p-2 border border-[#FC4308] outline-0 focus:ring-[#FC4308] rounded-md bg-white w-24 lg:w-40 max-w-56'
      >
        <option value=''>Select Author</option>
        {authors.length > 0 ? (
          authors.map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))
        ) : (
          <option disabled>Loading authors...</option>
        )}
      </select>
    </div>
  )
}

export default Filter
