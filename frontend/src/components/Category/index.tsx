import React from 'react'

type CategoryTabProps = {
  label: string
  image: string
  onClick: () => void // Accept an onClick function
}

const CategoryTab: React.FC<CategoryTabProps> = ({ image, label, onClick }) => {
  return (
    <button
      onClick={onClick} // Trigger parent function when clicked
      className='cursor-pointer w-40 h-11 rounded-xl flex justify-center items-center bg-cover bg-center relative overflow-hidden'
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className='absolute inset-0 bg-black opacity-50 backdrop-blur-lg'></div>
      <label className='text-white font-semibold text-base z-10'>{label}</label>
    </button>
  )
}

export default CategoryTab
