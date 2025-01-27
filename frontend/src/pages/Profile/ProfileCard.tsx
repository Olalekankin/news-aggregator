import React, { useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { Button } from '../../components/Button'
import Modal from '../../components/Modal'
import PreferenceForm from '../../components/PreferenceForm'
import { IoMdClose } from 'react-icons/io'

const ProfileCard: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <section className='w-full flex h-full items-center min-h-[300px] mt-16'>
        <div className='flex-1 flex justify-center'>
          <div className='flex flex-col items-center'>
            <FaCircleUser className='size-20 text-[#FC4308]' />
            <div className='mt-6 text-center'>
              <h3 className='text-lg lg:text-2xl font-semibold'>
                Olalekan Akinwale
              </h3>
              <p className='text-sm lg:text-base mt-1.5'>
                olalekankin@gmail.com
              </p>
            </div>
            <div className='flex items-center space-x-6 mt-10'>
              <Button className='bg-[#FC4308] text-white px-6 py-2 rounded-md'>
                Edit profile
              </Button>
              <button
                onClick={() => setIsModalOpen(true)}
                className='bg-[#FC4308] text-white px-6 py-2 rounded-md'
              >
                Change preference
              </button>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className='relative'>
            <h2 className='text-xl font-bold mb-2'>
              Edit your news preference
            </h2>
            <div>
              <PreferenceForm />
            </div>
            <Button
              onClick={() => setIsModalOpen(false)}
              className='bg-gray-200 absolute right-4 size-8 top-1 px-4 rounded-full flex justify-center items-center'
            >
              <IoMdClose className='text-gray-900'/>
            </Button>
          </div>
        </Modal>
      </section>
    </>
  )
}

export default ProfileCard
