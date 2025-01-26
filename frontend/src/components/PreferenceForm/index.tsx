import React, { useState } from 'react'
import Form from '../Form'

const PreferenceForm = () => {
  const categories = [
    { id: 1, label: 'Electronics' },
    { id: 2, label: 'Health' },
    { id: 3, label: 'Lifestyle' },
    { id: 4, label: 'Gadgets' },
    { id: 5, label: 'Watches' },
    { id: 6, label: 'Travel' },
    { id: 7, label: 'Sports' },
    { id: 8, label: 'Home Decor' },
  ]

  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Selected Categories:', selectedCategories)
    // Add submission logic here
  }

  return (
    <Form
      onSubmit={handleSubmit}
      buttonText='Save Preference'
      className='max-w-lg mx-auto p-6 space-y-6'
    >
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {categories.map((category) => (
          <button
            type='button'
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCategories.includes(category.id)
                ? 'bg-[#fc4508df] text-white border-[#FC4308]'
                : 'bg-gray-100 text-gray-700 border-gray-300'
            } transition hover:bg-[#fc4508df] hover:text-white`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </Form>
  )
}

export default PreferenceForm
