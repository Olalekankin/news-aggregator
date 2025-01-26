import React from 'react'
import ReactDOM from 'react-dom'
import { FaTimes } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div
        className='bg-white rounded-lg p-6 w-full max-w-md'
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing modal
      >
        <button
          className='absolute top-4 right-4 text-gray-500 hover:text-black'
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
