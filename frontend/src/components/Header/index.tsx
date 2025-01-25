import React, { useState } from 'react'
import { Img } from '../Img'
import { MdMenu } from 'react-icons/md'
import { Links } from '../Links'
import { SearchBox } from '../SearchBox'
import { Link } from 'react-router-dom'
import { FaChevronDown, FaRegCircleUser } from 'react-icons/fa6'
import { RiUserAddLine } from 'react-icons/ri'
import Dropdown from '../Dropdown'

interface Props {
  className: string
  isAuthenticated: boolean // New prop for authentication status
  userName?: string // Optional username for authenticated users
}

export default function Header({
  isAuthenticated,
  userName = 'User',
  ...props
}: Props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  return (
    <header {...props} className={` w-full py-2`}>
      <div className='flex w-full justify-center lg:hidden mb-4'>
        <Links href='/'>
          <Img src='assets/logo.svg' alt='Logo' className='s' />
        </Links>
      </div>
      <div className='w-full flex items-center space-x-4 justify-between lg:space-x-16'>
        <div className='block lg:flex items-center space-x-8'>
          <div className='hidden lg:inline'>
            <Links href='/'>
              <Img src='assets/logo.svg' alt='Logo' className='s' />
            </Links>
          </div>
          <div className='hidden lg:inline'>
            <ul className='flex items-center space-x-8'>
              <li>
                <Links href=''>News</Links>
              </li>
              <li>
                <Links href=''>About</Links>
              </li>
              <li>
                <Links href=''>Contact</Links>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-3/4 lg:w-1/3'>
          {/* Search box */}
          <SearchBox iconSrc='assets/search.svg'></SearchBox>
        </div>
        <div className='hidden md:flex items-center'>
          {!isAuthenticated ? (
            // Login and Register Links
            <div className='flex items-center space-x-5'>
              <Link
                to={'/sign-in'}
                className='flex items-center space-x-2 hover:text-red-500 transition-colors duration-500 ease-in'
              >
                <FaRegCircleUser />
                <span className='font-medium'>Login</span>
              </Link>
              <Link
                to={'/sign-up'}
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
                      to={'/profile'}
                      className='block w-full text-left px-2 py-1 hover:bg-gray-100 rounded'
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/setting'}
                      className='block w-full text-left px-2 py-1 hover:bg-gray-100 rounded'
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeDropdown()
                        console.log('Logging out...')
                      }}
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
