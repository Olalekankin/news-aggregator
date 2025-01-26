import React from 'react'
import Routes from './Routes'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
         {/* Header  */}
        <header className='py-4 lg:px-20'>
          <Header />
        </header>

        {/* Main Content  */}
        <main className='flex-grow  lg:px-20'>
          <Routes />
        </main>

        {/* Footer  */}
        <footer className='w-full mt-16'>
          <Footer />
        </footer>
      </div>
    </Router>
  )
}

export default App
