import React, { useEffect, useRef, useState } from 'react'

type SliderProps = {
  cards: React.ReactNode[] // Array of custom cards to display
  autoSlideInterval?: number // Time in ms for auto-slide
}

const Slider: React.FC<SliderProps> = ({ cards, autoSlideInterval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = useRef<NodeJS.Timeout | null>(null)

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % cards.length)
    }, autoSlideInterval)
  }

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current)
    }
  }

  const nextSlide = () => {
    stopAutoSlide()
    setCurrentSlide((prev) => (prev + 1) % cards.length)
    startAutoSlide()
  }

  const prevSlide = () => {
    stopAutoSlide()
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length)
    startAutoSlide()
  }

  useEffect(() => {
    startAutoSlide()
    return stopAutoSlide
  }, [cards.length, autoSlideInterval])

  return (
    <div className='relative w-full overflow-hidden'>
      {/* Slider Wrapper */}
      <div
        className='flex transition-transform duration-300 ease-in-out bg-amber-50'
        style={{ transform: `translateX(-${currentSlide * 300}px)` }}
      >
        {cards.map((card, index) => (
          <div key={index} className='w-[300px] flex-shrink-0'>
            {card}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className='absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
      >
        &#8594;
      </button>
    </div>
  )
}

export default Slider
