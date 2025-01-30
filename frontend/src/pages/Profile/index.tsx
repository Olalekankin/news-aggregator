import React from 'react'
import ProfileCard from './ProfileCard'
import { Helmet } from 'react-helmet'
const ProfileIndex: React.FC = () => {
  
  return (
    <>
      <Helmet>
        <title>Profile - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>
      <div>
        <div>
          <ProfileCard/>
        </div>
      </div>
    </>
  )
}

export default ProfileIndex
