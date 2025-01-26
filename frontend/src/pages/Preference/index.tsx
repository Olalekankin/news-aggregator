import React from 'react'
import PreferenceForm from '../../components/PreferenceForm'
import { Img } from '../../components/Img'
import { Helmet } from 'react-helmet'

const Preference: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Preference - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div className=''>
        <div className='flex items-center justify-center lg:space-x-10'>
          <div className='hidden lg:inline h-[300px]'>
            <Img
              src='assets/card.png'
              className='object-cover object-center h-full'
            />
          </div>
          <div className='w-full lg:w-auto'>
            <div className='mb-4'>
              <h2 className='text-lg font-semibold text-center lg:text-left'>
                Welcome
              </h2>
              <p className='text-center text-sm text-gray-600'>
                To serve you the best of news, kindly select the category of
                news
              </p>
            </div>
            <PreferenceForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Preference
