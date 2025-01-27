import React from 'react'
import { Button } from '../Button'
import { useNavigate } from 'react-router-dom'
import { FaCheck, FaPlus } from 'react-icons/fa6'

type AddToPreferenceProps = {
  category: string
  preferenceData: string[] // Array of user preferences
  isAuthenticated: boolean // Check if the user is authenticated
  onSavePreference: (category: string) => Promise<void>
}

const AddToPreference: React.FC<AddToPreferenceProps> = ({
  category,
  preferenceData = [],
  isAuthenticated,
  onSavePreference,
}) => {
  const navigate = useNavigate()

  const handleClick = async () => {
    if (isAuthenticated) {
      await onSavePreference(category)
    } else {
      navigate('/login')
    }
  }

  const isPreferenceSaved = preferenceData.includes(category)

  return (
    <div className='flex items-center space-x-2'>
      <span className='text-sm font-medium text-[#616060]'>{category}</span>
      <Button onClick={handleClick}>
        {isPreferenceSaved ? <FaCheck /> : <FaPlus />}
      </Button>
    </div>
  )
}

export default AddToPreference
