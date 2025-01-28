import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { ArticlesProvider } from './context/ArticlesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArticlesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ArticlesProvider>
  </StrictMode>
)
