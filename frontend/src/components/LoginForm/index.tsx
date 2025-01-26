import React from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import Form from '../Form'

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    console.log('Sign-In Data:', data)
  }

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white md:shadow-md md:drop-shadow-sm rounded-md'>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        Sign In
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)} buttonText='Login'>
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
            className='w-full p-2 mt-1 border border-gray-400 rounded-md '
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
            className='w-full p-2 mt-1 border border-gray-400 rounded-md '
            placeholder='Enter your password'
          />
          {errors.password && (
            <p className='text-orange-500 text-sm mt-1'>
              {String(errors.password.message)}
            </p>
          )}
        </div>
      </Form>
    </div>
  )
}

export default LoginForm
