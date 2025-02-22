import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LatestNews from './components/LatestestNewsLayout'
import { useEffect } from 'react'
import { useArticles } from './context/ArticlesContext'
import ScrollToTop from './utilis/scrollTop'

const App = () => {
  const { fetchArticles } = useArticles()

  // Fetch articles when the component mounts
  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  return (
    <Router>
      <ScrollToTop />
      <div className='flex flex-col min-h-screen'>
        {/* Header  */}
        <header className='py-4 lg:px-20'>
          <Header />
        </header>

        {/* Main Content  */}
        <main className='flex-grow lg:px-20'>
          <Routes />
        </main>

        {/* Latest News */}
        <section className='mt-10 lg:mt-16'>
          <LatestNews />
        </section>

        {/* Footer  */}
        <footer className='w-full mt-16'>
          <Footer />
        </footer>
      </div>
    </Router>
  )
}

export default App
