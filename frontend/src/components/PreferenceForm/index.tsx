import React, { useEffect, useState } from 'react'
import Form from '../Form'
import axios from 'axios'

const PreferenceForm = () => {
 const [categories, setCategories] = useState<string[]>([])
 const [authors, setAuthors] = useState<string[]>([])
 const [sources, setSources] = useState<string[]>([])

 const fetchAndFilterArticles = async () => {
   try {
     const response = await axios.get('http://127.0.0.1:8000/api/article')
     const articles = response.data

     // Filter articles by categories, author, and source
     const categories = Array.from(
       new Set(articles.map((article: any) => article.category))
     )
     const authors = Array.from(
       new Set(articles.map((article: any) => article.author))
     )
     const sources = Array.from(
       new Set(articles.map((article: any) => article.source))
     )

     // Save the filtered arrays in state
     setCategories(categories)
     setAuthors(authors)
     setSources(sources)
   } catch (error) {
     console.error('Error fetching articles:', error.message)
   }
 }

 useEffect(() => {
   fetchAndFilterArticles()
 }, [])

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
