import React from 'react'
import { Link } from 'react-router-dom'

type BreadcrumbLink = {
  label: string
  href?: string 
}

type BreadcrumbProps = {
  links: BreadcrumbLink[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {links.map((link, index) => (
          <li key={index} className='inline-flex items-center'>
            {index > 0 && (
              <svg
                className='rtl:rotate-180 size-2 text-gray-400 mx-1'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
            )}
            {link.href ? (
              <Link
                to={link.href}
                className='text-sm font-medium text-gray-700 hover:text-blue-600'
              >
                {link.label}
              </Link>
            ) : (
              <span
                className='text-sm font-medium text-gray-500'
                aria-current='page'
              >
                {link.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
