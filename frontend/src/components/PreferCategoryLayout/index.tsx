import CategoryTab from '../Category'

export default function PreferredCategory() {
  type Category = {
    categoryName: string
    label: string
    image: string
  }
  const categories: Category[] = [
    { categoryName: 'sport', label: 'Sport', image: 'assets/sport.png' },
    { categoryName: 'music', label: 'Music', image: 'assets/music.png' },
    { categoryName: 'tech', label: 'Tech', image: 'assets/tech.png' },
    { categoryName: 'food', label: 'Food', image: 'assets/food.jpg' },
    { categoryName: 'animal', label: 'Animal', image: 'assets/animal.png' },
    { categoryName: 'car', label: 'Car', image: 'assets/car.png' },
    {
      categoryName: 'abstract',
      label: '#Abstract',
      image: 'assets/abstract.png',
    },
    { categoryName: 'health', label: '#Health', image: 'assets/medicine.png' },
  ]

  return (
    <div className='py-2.5 bg-[#fc45087c] hidden lg:flex items-center space-x-6 mt-5 px-4 overflow-x-hidden'>
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
