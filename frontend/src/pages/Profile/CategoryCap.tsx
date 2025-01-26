import React from 'react'
import CategoryTab from '../../components/Category'

export default function CategoryCap() {
  type Category = {
    categoryName: string
    label: string
    image: string
  }
  const categories: Category[] = [
    { categoryName: 'sport', label: '#Sport', image: 'assets/sport.png' },
    { categoryName: 'music', label: '#News', image: 'assets/headphone.png' },
    { categoryName: 'tech', label: '#Tech', image: 'assets/tech.png' },
    { categoryName: 'food', label: '#Food', image: 'assets/food.png' },
    { categoryName: 'animal', label: '#Animal', image: 'assets/animal.png' },
    { categoryName: 'car', label: '#Car', image: 'assets/car.png' },
  ]

  return (
    <div className='py-2.5 bg-gray-200 hidden lg:flex items-center space-x-6 mt-5 px-4'>
      {categories.map((category, index) => (
        <CategoryTab
          key={index}
          categoryName={category.categoryName}
          label={category.label}
          image={category.image}
        />
      ))}
    </div>
  )
}
