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
  token: string | null // Authentication token
  fetchArticles: () => Promise<void> // Fetch all articles (no query)
  fetchArticlesByQuery: (
    params: Record<string, string | number | undefined>
  ) => Promise<void> // Fetch filtered articles
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
  const [articles, setArticles] = useState<Article[]>([]) // Stores all articles
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]) // Stores filtered articles by query
  const [searchResults, setSearchResults] = useState<Article[]>([]) 

  const [sources, setSources] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
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

  // Fetch articles dynamically (public or personalized)
  const fetchArticles = useCallback(async () => {
    console.log(token)
    try {
      const endpoint = token
        ? `${API_URL}/articles/personalized`
        : `${API_URL}/articles`

      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      const response = await axios.get(endpoint, { headers })
      if(endpoint){
        setArticles(response.data.data.reverse())
      }
      setArticles(response.data.data)
      
    } catch (error) {
      console.error('Error fetching articles:')
    }
  }, [token])

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

        const response = await axios.get(
          `${API_URL}/news/search?${params.toString()}`
        )
         const endpoint = `${API_URL}/news/search?${params.toString()}`
         console.log('API Endpoint:', endpoint)
        setSearchResults(response.data.articles)
        // Separate logs for different conditions
        if (!filters.source && !filters.published_at && !filters.author) {
          console.log(
            'Search results with keyword only:',
            response.data.articles
          )
        } else {
          console.log(
            'Search results with keyword and filters:',
            response.data.articles
          )
        }
      } catch (error) {
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
      const response = await axios.get(
        `${API_URL}/news/categories`
      )
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
        token,
        fetchArticles,
        fetchArticlesByQuery,
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
