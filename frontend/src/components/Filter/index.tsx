import React, { useState, useEffect, useRef } from 'react'
import { BiBriefcase } from 'react-icons/bi'

// Define the shape of the props
interface FilterProps {
  filterData: (filter: { type: 'date' | 'source'; value: string }) => void
  sources: string[] // List of source options
  initialDate?: string // Optional initial date
}

const Filter: React.FC<FilterProps> = ({
  filterData,
  sources,
  initialDate,
}) => {
  const now = new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || now)
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [isSourceMenuOpen, setIsSourceMenuOpen] = useState<boolean>(false)

  const menuRef = useRef<HTMLDivElement>(null)

  // Close source menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSourceMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle date change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value
    setSelectedDate(date)
    filterData({ type: 'date', value: date })
  }

  // Handle source selection
  const handleSourceChange = (source: string) => {
    setSelectedSource(source)
    setIsSourceMenuOpen(false)
    filterData({ type: 'source', value: source })
  }

  return (
    <div>
      {/* Filter Controls */}
      <div className='flex items-center space-x-2 mt-5 relative'>
        {/* Date Filter */}
        <input
          type='date'
          value={selectedDate}
          onChange={handleDateChange}
          className='p-2 bg-[#FC4308] text-white rounded-md cursor-pointer'
          style={{
            colorScheme: 'dark', 
          }}
        />

        {/* Source Filter */}
        <button
          onClick={() => setIsSourceMenuOpen(!isSourceMenuOpen)}
          className='bg-[#FC4308] text-white px-4 py-2.5 flex items-center space-x-2 rounded-md'
        >
          <BiBriefcase />
          <span className='text-sm'>{selectedSource || 'Source'}</span>
        </button>
      </div>

      {/* Source Menu */}
      {isSourceMenuOpen && (
        <div
          ref={menuRef}
          className='border border-gray-200 absolute z-30 w-full md:w-1/3 lg:w-[250px] mt-5 rounded-md bg-white shadow p-4 drop-shadow-md h-[400px] overflow-y-scroll'
        >
          <h2 className='text-sm md:text-base font-medium text-black'>
            Select news source
          </h2>
          <div className='mt-5 space-y-2'>
            {sources.map((source, index) => (
              <button
                key={index}
                type='button'
                onClick={() => handleSourceChange(source)}
                className={`w-full border border-gray-200 text-left p-2 rounded-md ${
                  selectedSource === source
                    ? 'bg-[#FC4308] text-white'
                    : 'bg-gray-50'
                }`}
              >
                {source}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Filter
