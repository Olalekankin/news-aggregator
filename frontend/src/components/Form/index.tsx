import React from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'

type FormProps = {
  onSubmit: SubmitHandler<FieldValues>
  children: React.ReactNode
  buttonText?: string 
  className?: string 
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  children,
  buttonText = 'Submit',
  className,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-4 ${className}`}
    >
      {React.Children.map(children, (child) => {
        // Pass `register` and `errors` to each child field if needed
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { register, errors })
        }
        return child
      })}
      <button
        type='submit'
        className='w-full bg-[#fc4308] mt-6 text-white py-2 px-4 rounded-md hover:bg-orange-400'
      >
        {buttonText}
      </button>
    </form>
  )
}

export default Form
