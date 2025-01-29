import React, { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'

// Export Article interface
export interface Article {
  id: number
  category: string
  title: string
  description: string
  author: string
  source: string
  published_at: string
  url: string
  image_url: string
  created_at: string
  updated_at: string
  [key: string]: any
}

interface ArticlesContextType {
  articles: Article[]
  fetchArticles: () => Promise<void>
  searchArticles: (query: string) => Promise<void>
  fetchSources: () => Promise<string[]>
  fetchAuthors: () => Promise<string[]>
  fetchCategories: () => Promise<string[]>
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
)

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  

  // Fetch all articles
  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/articles')
      const articles = response.data.data
      setArticles(articles)
    } catch (error) {
      console.error('Error fetching articles:', error.message)
    }
  }, [])

  // Search for articles by a query
  const searchArticles = useCallback(async (keyword: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/news/search?keyword=${keyword}` 
      )
      const searchResults = response.data.articles
      setArticles(searchResults) // Update articles with search results
    } catch (error) {
      console.error('Error searching for articles:', error.message)
    }
  }, [])

  // Fetch sources
  const fetchSources = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/news/sources')
      setSources(response.data.data)
      return response.data.data
    } catch (error) {
      console.error('Error fetching sources:', error.message)
      return []
    }
  }, [])

  // Fetch authors
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/news/authors')
      setAuthors(response.data.data)
      return response.data.data
    } catch (error) {
      console.error('Error fetching authors:', error.message)
      return []
    }
  }, [])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/news/categories'
      )
      setCategories(response.data.data)
      return response.data.data
    } catch (error) {
      return []
    }
  }, [])

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        fetchArticles,
        searchArticles,
        fetchSources,
        fetchAuthors,
        fetchCategories,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => {
  const context = useContext(ArticlesContext)
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider')
  }
  return context
}
