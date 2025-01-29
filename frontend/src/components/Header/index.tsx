import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdMenu } from 'react-icons/md'
import { FaChevronDown, FaCircleUser, FaRegCircleUser } from 'react-icons/fa6'
import { RiUserAddLine } from 'react-icons/ri'
import { Img } from '../Img'
import { SearchBox } from '../SearchBox'
import Dropdown from '../Dropdown'
import { useAuth } from '../../context/AuthContext'
import { IoClose } from 'react-icons/io5'

// Navigation links for the header
const navigationLinks = [
  { text: 'News', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Contact', to: '/contact' },
]

export default function Header({ className }: { className: string }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  // Toggles user dropdown menu
  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  // Closes dropdown 
  const closeDropdown = () => setDropdownOpen(false)

  // Logs out user and redirects to sign-in page
  const handleLogout = () => {
    logout()
    navigate('/sign-in')
  }
   const [isOpen, setIsOpen] = useState(false)

   const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className={`w-full py-2 px-4 lg:px-0 ${className}`}>
      {/* Mobile Logo */}
        <div className='flex w-full justify-center lg:hidden mb-4'>
          <Link to='/'>
            <Img src='assets/logo.svg' alt='Logo' />
          </Link>
        </div>
        {/*mobile nav  */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform lg:hidden ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Close Button */}
          <button onClick={toggleMenu} className='absolute top-4 right-4'>
            <IoClose />
          </button>

          {/* Navigation Links */}
          <nav className='flex flex-col items-start p-6 space-y-4'>
            <Link to='/' className='text-lg text-gray-800' onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to='/profile'
              className='text-lg text-gray-800'
            >
             Profile
            </Link>
            <Link
              to='/sign-up'
              className='text-lg text-gray-800'
              
            >
              Register
            </Link>
            <Link
              to='/sign-in'
              className='text-lg text-gray-800'
              
            >
             Login
            </Link>
          </nav>
        </div>

        {/* Main Navigation */}
        <div className='w-full flex items-center justify-between lg:space-x-16'>
          <div className='flex items-center space-x-8'>
            {/* Desktop Logo */}
            <div className='hidden lg:block'>
              <Link to='/'>
                <Img src='assets/logo.svg' alt='Logo' />
              </Link>
            </div>

            {/* Navigation Links */}
            <ul className='hidden lg:flex items-center space-x-8'>
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`transition-colors duration-300 ${
                      location.pathname === link.to
                        ? 'text-red-500 font-bold'
                        : 'hover:text-red-500'
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Box */}
          <div className='flex-1 lg:w-1/3'>
            <SearchBox />
          </div>

          {/* User Section */}
          <div className='hidden md:flex items-center'>
            {isAuthenticated ? (
              // **Authenticated User Menu**
              <div className='relative'>
                <div className='flex items-center space-x-4'>
                  <div className='rounded-md'>
                    <FaCircleUser className='text-[#FC4308] text-lg' />
                  </div>
                  <button
                    onClick={toggleDropdown}
                    className='font-medium text-sm flex items-center space-x-2 text-gray-900'
                  >
                    <span>{user?.name || 'User'}</span>
                    <FaChevronDown />
                  </button>
                </div>

                {/* Dropdown Menu */}
                <Dropdown
                  isOpen={isDropdownOpen}
                  onClose={closeDropdown}
                  position='right'
                  className='top-5 -right-16'
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
                        to='/settings'
                        className='block w-full text-left px-2 py-1 hover:bg-gray-100 rounded'
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-2 py-1 text-red-500 hover:bg-gray-100 rounded'
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </Dropdown>
              </div>
            ) : (
              // **Guest User: Login & Register Links**
              <div className='flex items-center space-x-5'>
                <Link
                  to='/sign-in'
                  className='flex items-center space-x-2 hover:text-red-500 transition-colors duration-500'
                >
                  <FaRegCircleUser />
                  <span className='font-medium'>Login</span>
                </Link>
                <Link
                  to='/sign-up'
                  className='flex items-center space-x-2 hover:text-red-500 transition-colors duration-500'
                >
                  <RiUserAddLine />
                  <span className='font-medium'>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className='md:hidden bg-gray-200 p-3.5 rounded'
          >
            <MdMenu className='text-[#3E3232] size-5' />
          </button>
        </div>
    </header>
  )
}
