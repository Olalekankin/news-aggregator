import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
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
  articles: Article[] // Stores all articles
  filteredArticles: Article[] // Stores filtered articles by query
  searchResults: Article[] // Stores search results
  personalizedArticles: Article[] // Stores personalize articles
  singleArticle: Article | null // Stores a single article fetched by ID
  authors: Article | null // Stores a single article fetched by ID
  sources: Article | null // Stores a single article fetched by ID
  categories: Article | null // Stores a single article fetched by ID
  token: string | null // Authentication token
  fetchArticles: () => Promise<void> // Fetch all articles
  fetchPersonalizedArticle: () => Promise<void> // Fetch all articles
  fetchArticlesByQuery: (
    params: Record<string, string | number | undefined>
  ) => Promise<void> // Fetch filtered articles
  searchArticles: (query: string) => Promise<void> // Search articles by keyword
  fetchSources: () => Promise<string[]> // Fetch all sources
  fetchAuthors: () => Promise<string[]> // Fetch all authors
  fetchCategories: () => Promise<string[]> // Fetch all categories
  fetchArticleById: (id: number) => Promise<void> // Fetch a single article by ID
}

const ArticlesContext = createContext<ArticlesContextType | undefined>(
  undefined
)

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<Article[]>([]) // Stores all articles
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
  const [searchResults, setSearchResults] = useState<Article[]>([]) 
  const [personalizedArticles, setPersonalizedArticles] = useState<Article[]>([]) 
  const [singleArticle, setSingleArticle] = useState<Article | null>(null)
  const [sources, setSources] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [token, setToken] = useState<string | null>(localStorage.getItem('token')
  )

  const API_URL = import.meta.env.VITE_API_URL

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'))
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Fetch all articles
  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/articles`)
      setArticles(response.data.data)
    } catch (error) {
      console.error('Error fetching articles:', error.message)
    }
  }, [])

  // Fetch all articles
  const fetchPersonalizedArticle = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/articles/personalized`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPersonalizedArticles(response.data.data)
    } catch (error) {
      console.error('Error fetching articles:', error.message)
    }
  }, [token])

  // Fetch a single article by ID
  const fetchArticleById = useCallback(async (id: number) => {
      if (!id) return 

      try {
        const url = `${API_URL}/articles/${id}`
        console.log(`Fetching article from: ${url}`)
        const response = await axios.get(url)
        setSingleArticle(response.data)
        console.log(singleArticle)
      } catch (error) {
        console.error(`Error fetching article with id ${id}:`, error.message)
        setSingleArticle(null) 
      }
  }, [])

  // Fetch articles by query (filtered)
  const fetchArticlesByQuery = useCallback(
    async (params: Record<string, string | number | undefined>) => {
      try {
        const queryString = new URLSearchParams(
          params as Record<string, string>
        ).toString()
        const url = `${API_URL}/articles?${queryString}`
        const response = await axios.get(url)
        setFilteredArticles(response.data.data)
      } catch (error) {
        console.error('Error fetching articles by query:', error.message)
      }
    },
    []
  )

  // Search for articles by a query
  const searchArticles = useCallback(
    async (
      keyword: string,
      filters: { source?: string; published_at?: string; author?: string } = {}
    ) => {
      try {
        // Build query parameters
        const params = new URLSearchParams()
        if (keyword) params.append('keyword', keyword)
        if (filters.source) params.append('source', filters.source)
        if (filters.published_at)
          params.append('published_at', filters.published_at)
        if (filters.author) params.append('author', filters.author)

        const url = `${API_URL}/news/search?${params.toString()}`

        // Log the URL being hit
        console.log(`Making request to: ${url}`)

        const response = await axios.get(url)

        // Log the response
        console.log('Response received:', response.data)

        // Set the search results in context state
        setSearchResults(response.data.articles)
      } catch (error) {
        // Log any errors
        console.error('Error searching for articles:', error.message)
      }
    },
    []
  )

  // Fetch sources
  const fetchSources = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/news/sources`)
      setSources(response.data.sources)
      return response.data.sources
    } catch (error) {
      console.error('Error fetching sources:', error.message)
      return []
    }
  }, [])

  // Fetch authors
  const fetchAuthors = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/news/authors`)
      setAuthors(response.data.authors)
      return response.data.authors
    } catch (error) {
      console.error('Error fetching authors:', error.message)
      return []
    }
  }, [])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/news/categories`)
      setCategories(response.data.categories)
      return response.data.categories
    } catch (error) {
      console.error('Error fetching categories:', error.message)
      return []
    }
  }, [])

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        filteredArticles,
        searchResults, 
        singleArticle,
        personalizedArticles,
        token,
        authors,
        sources,
        categories,
        fetchArticles,
        fetchArticlesByQuery,
        fetchPersonalizedArticle,
        searchArticles,
        fetchSources,
        fetchAuthors,
        fetchCategories,
        fetchArticleById,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  )
}

// Hook to access the articles context
export const useArticles = () => {
  const context = useContext(ArticlesContext)
  if (!context) {
    throw new Error('useArticles must be used within an ArticlesProvider')
  }
  return context
}
