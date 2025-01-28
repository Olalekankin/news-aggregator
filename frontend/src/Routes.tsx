import { useRoutes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import NewsPage from './pages/NewsPage'
import NewsDetails from './pages/NewsDetails'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Preference from './pages/Preference'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'
import Search from './pages/Search'

const Routes = () => {
  const { isAuthenticated } = useAuth() 
  let element = useRoutes([
    { path: '*', element: <NotFound /> },
    {
      path: '/',
      element: isAuthenticated ? <Navigate to='/home' /> : <NewsPage />,
    },
    { path: '/:articleId', element: <NewsDetails /> },
    { path: '/search', element: <Search /> },
    {
      path: '/sign-in',
      element: isAuthenticated ? <Navigate to='/home' /> : <SignIn />,
    },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/preference', element: <Preference /> },

    {
      path: '/profile',
      element: isAuthenticated ? <Profile /> : <Navigate to='/sign-in' />,
    },
    {
      path: '/home',
      element: isAuthenticated ? <Home /> : <Navigate to='/sign-in' />,
    },
  ])

  return element
}

export default Routes
