import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

// Export Article interface 
export interface Article {
  id: number
  category: string
  title: string
  description: string
  author: string | null
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
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
)

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/articles')
      // Handle the 'author' field being null in the fetched articles
      const updatedArticles = response.data.map((article: Article) => ({
        ...article,
        author: article.author ?? 'Anonymous',
      }))
      setArticles(updatedArticles)
    } catch (error) {
      console.error('Error fetching articles:', error.message)
    }
  }

  return (
    <ArticlesContext.Provider value={{ articles, fetchArticles }}>
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
