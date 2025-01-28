import React, { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Form from '../Form'
import { useAuth } from '../../context/AuthContext'

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true)

      const response = await axios.post('http://127.0.0.1:8000/api/login', data)

      if (response.status === 200) {
        // Extract user and token from the response
        const { user, token } = response.data

        // Save user data and token to localStorage
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))

        // Update the global context with the user data
        setUser(user)
        console.log(user)

        navigate('/home')
      }
    } catch (error: any) {
      // Handle error response
      console.error(
        'Error during login:',
        error.response?.data || error.message
      )
    } finally {
      setLoading(false) 
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white md:shadow-md md:drop-shadow-sm rounded-md'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        Sign In
      </h2>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        buttonText={loading ? 'Logging in...' : 'Login'}
      >
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            {...register('email', { required: 'Email is required' })}
            type='email'
            id='email'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Enter your email'
          />
          {errors.email && (
            <p className='text-red-500 text-sm mt-1'>
              {String(errors.email.message)}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            type='password'
            id='password'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Enter your password'
          />
          {errors.password && (
            <p className='text-orange-500 text-sm mt-1'>
              {String(errors.password.message)}
            </p>
          )}
        </div>
      </Form>
      <div>{loading && <span className='loader mt-6'></span>}</div>
    </div>
  )
}

export default LoginForm
