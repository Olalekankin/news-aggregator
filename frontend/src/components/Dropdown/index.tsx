import React, { useRef, useEffect } from 'react'

type DropdownProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: 'left' | 'right' // Optional positioning
  className?: string // Optional custom styling
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  children,
  position = 'left',
  className = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className={`absolute mt-2 border border-gray-300 ${
        position === 'right' ? 'right-0' : 'left-0'
      } bg-white shadow-md rounded-lg p-4 w-48 z-50 ${className}`}
    >
      {children}
    </div>
  )
}

export default Dropdown
