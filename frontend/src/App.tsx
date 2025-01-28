import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LatestNews from './components/LatestestNewsLayout'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { isAuthenticated, user } = useAuth()
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        {/* Header  */}
        <header className='py-4 lg:px-20'>
          <Header
            isAuthenticated={isAuthenticated}
            userName={user?.name || 'User'}
          />
        </header>

        {/* Main Content  */}
        <main className='flex-grow  lg:px-20'>
          <Routes />
        </main>
        {/* Foot news layout */}
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
