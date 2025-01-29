import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import Form from '../Form'
import { useAuth } from '../../context/AuthContext' 

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { login } = useAuth() 
   const API_URL = import.meta.env.VITE_API_URL 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true)

      // Sending sign-up data to the backend using axios
      const response = await axios.post(
        `${API_URL}/register`,
        data
      )

      if (response.status === 200 || response.status === 201) {
        const { user, token } = response.data

        // Use the login function to store user and set authentication status
        login(user, token)

        // Store the token in localStorage
        localStorage.setItem('token', token)

        // Redirect to the preference setting page
        navigate('/preference') 
      }
    } catch (error: any) {
      // Handle error response
      console.error(
        'Error during sign-up:',
        error.response?.data || error.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white md:drop-shadow-sm md:shadow-md rounded-md'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        Sign Up
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} buttonText='Register'>
        {/* Name Field */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            type='text'
            id='name'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Enter your name'
          />
          {errors.name?.message && (
            <p className='text-red-500 text-sm mt-1'>
              {String(errors.name.message)}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            type='email'
            id='email'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Enter your email'
          />
          {errors.email?.message && (
            <p className='text-red-500 text-sm mt-1'>
              {String(errors.email.message)}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            type='password'
            id='password'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Enter your password'
          />
          {errors.password?.message && (
            <p className='text-red-500 text-sm mt-1'>
              {String(errors.password.message)}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor='password_confirmation'
            className='block text-sm font-medium text-gray-700'
          >
            Confirm Password
          </label>
          <input
            {...register('password_confirmation', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
            type='password'
            id='password_confirmation'
            className='w-full p-2 mt-1 border border-gray-400 rounded-md'
            placeholder='Confirm your password'
          />
          {errors.confirmPassword?.message && (
            <p className='text-red-500 text-sm mt-1'>
              {String(errors.confirmPassword.message)}
            </p>
          )}
        </div>
      </Form>
      <div className='w-full justify-center flex justify-center'>
        {loading && <span className='loader mt-6'></span>}
      </div>
    </div>
  )
}

export default RegisterForm
