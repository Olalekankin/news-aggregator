import React from 'react'
import { useRoutes } from 'react-router-dom'
import NewsPage from './pages/NewsPage'
import Home from './pages/Home'
import NewsDetails from './pages/NewsDetails'
import Category from './pages/Category/CategoryContent'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Preference from './pages/Preference'

const Routes = () => {
  let element = useRoutes([
    { path: '*', element: <NotFound /> }, // 404 page route
    { path: '/', element: <NewsPage /> }, // News landing page route
    { path: '/:articleId', element: <NewsDetails /> }, // News details page route
    { path: '/search', element: <Search /> }, // Search page route
    { path: '/category/:categoryName', element: <Category /> }, // Category page route
    { path: '/sign-in', element: <SignIn /> }, // sign-in page route 
    { path: '/sign-up', element: <SignUp /> }, // sign-up page route
    { path: '/profile', element: <Profile /> }, // Profile page route
    { path: '/home', element: <Home /> }, // Profile page route
    { path: '/preference', element: <Preference />, // Preference setting page
    },
  ])

  return element
}

export default Routes
