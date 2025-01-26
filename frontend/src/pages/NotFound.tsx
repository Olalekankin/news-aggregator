

const NotFound = () => {
  return (
    <div className='w-full px-4'>
      <div className='mt-10 lg:mt-20 flex justify-center'>
        <div>
          <h1 className='text-center text-[162px] lg:text-[198px] font-medium text-[#FC4308] drop-shadow-2xl'>
            404
          </h1>
          <p className='mt-6 text-center'>
            OOPS! Page you're looking for doesn't exist. Please use search for
            help
          </p>
        </div>
      </div>   
    </div>
  )
}

export default NotFound
