import React from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../Img'

interface LinkItem {
  name: string
  to: string
}

const Footer: React.FC = () => {
  // Links object
  const links: LinkItem[] = [
    { name: 'About', to: '/' },
    { name: 'Contact', to: '/contact' },
    { name: 'Licensing', to: '/licensing' },
    { name: 'Support', to: '/support' },
  ]

  return (
    <footer className='bg-gray-300 rounded-lg shadow-sm m-4'>
      <div className='w-full mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <Link
            to='/'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
          >
            <Img
              src='assets/logo.svg'
              alt='News.com Logo'
            />
          </Link>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0'>
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.to} className='hover:text-red-600 me-4 md:me-6'>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className='my-6 border border-[#FC4308] sm:mx-auto lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center'>
          © 2023{' '}
          <Link to='/' className='hover:text-red-600'>
            News.com™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
