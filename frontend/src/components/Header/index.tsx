import React, { useState } from 'react'
import { Img } from '../Img'
import { MdMenu } from 'react-icons/md'
import { SearchBox } from '../SearchBox'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaChevronDown, FaRegCircleUser } from 'react-icons/fa6'
import { RiUserAddLine } from 'react-icons/ri'
import Dropdown from '../Dropdown'
import { useAuth } from '../../context/AuthContext'

interface Props {
  className: string
  isAuthenticated: boolean
  userName?: string
}

// Navigation links object
const navigationLinks = [
  { text: 'News', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Contact', to: '/contact' },
]

export default function Header({
  isAuthenticated,
  userName = 'User',
  ...props
}: Props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate() 
  const { logout } = useAuth() 

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const handleLogout = () => {
    logout() // Call logout function (clear authentication)
    navigate('/sign-in') // Redirect to the sign-in page after logout
  }

  return (
    <header {...props} className='w-full py-2 px-4 lg:px-0'>
      <div className='flex w-full justify-center lg:hidden mb-4'>
        <Link to='/'>
          <Img src='assets/logo.svg' alt='Logo' className='s' />
        </Link>
      </div>
      <div className='w-full flex items-center space-x-4 justify-between lg:space-x-16'>
        <div className='block lg:flex items-center space-x-8'>
          <div className='hidden lg:inline'>
            <Link to='/'>
              <Img src='assets/logo.svg' alt='Logo' className='s' />
            </Link>
          </div>
          <div className='hidden lg:inline'>
            <ul className='flex items-center space-x-8'>
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className={`${
                      location.pathname === link.to
                        ? 'text-red-500 font-bold'
                        : 'hover:text-red-500'
                    } transition-colors duration-300`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex-1 lg:w-1/3'>
          {/* Search box */}
          <SearchBox iconSrc='assets/search.svg'></SearchBox>
        </div>
        <div className='hidden md:flex items-center'>
          {!isAuthenticated ? (
            // Login and Register Links
            <div className='flex items-center space-x-5'>
              <Link
                to='/sign-in'
                className='flex items-center space-x-2 hover:text-red-500 transition-colors duration-500 ease-in'
              >
                <FaRegCircleUser />
                <span className='font-medium'>Login</span>
              </Link>
              <Link
                to='/sign-up'
                className='flex items-center space-x-2 hover:text-red-500 transition-colors duration-500 ease-in'
              >
                <RiUserAddLine />
                <span className='font-medium'>Register</span>
              </Link>
            </div>
          ) : (
            // Profile Section
            <div>
              <div className='flex items-center space-x-4'>
                <div className='size-11 rounded-md object-cover'>
                  <Img src='assets/profile.png' alt='Profile' />
                </div>
                <button
                  onClick={toggleDropdown}
                  className='text-gray-900 font-medium flex items-center space-x-4'
                >
                  <span className='font-medium'>{userName}</span>
                  <FaChevronDown />
                </button>
              </div>
              <Dropdown
                isOpen={isDropdownOpen}
                onClose={closeDropdown}
                position='right'
                className='top-20 right-5'
              >
                <ul className='space-y-2'>
                  <li>
                    <Link
                      to='/profile'
                      className='block w-full text-left px-2 py-1 hover:bg-gray-100 rounded'
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/setting'
                      className='block w-full text-left px-2 py-1 hover:bg-gray-100 rounded'
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout} // Logout handler
                      className='block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100 rounded'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          )}
        </div>
        <div className='md:hidden'>
          <button className='bg-gray-200 p-3.5 rounded'>
            <MdMenu className='text-[#3E3232] size-5' />
          </button>
        </div>
      </div>
    </header>
  )
}
