import React from 'react'
import { Link } from 'react-router-dom'

type CategoryProp = {
  categoryName: string
  label: string
  image: string
}

const CategoryTab: React.FC<CategoryProp> = ({
  categoryName,
  label,
  image,
}) => {
  return (
    <Link to={`/category/${categoryName}`}>
      <div
        className='w-40 h-11 rounded-xl flex justify-center items-center bg-cover bg-center relative overflow-hidden'
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className='absolute inset-0 bg-black opacity-60 backdrop-blur-lg'></div>
        <label className='text-white font-semibold text-base z-10'>
          {label}
        </label>
      </div>
    </Link>
  )
}

export default CategoryTab
