import { Helmet } from 'react-helmet'
import LoginForm from '../components/LoginForm'

const SignIn = () => {
  return (
    <>
      <Helmet>
        <title>Sign-in - News.com</title>
        <meta name='description' content='Your news home' />
        <meta name='keywords' content='React, SEO, Helmet' />
      </Helmet>

      <div className=''>
        <div className='lg:my-20'>
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default SignIn
