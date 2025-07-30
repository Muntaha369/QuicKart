import React from 'react'
import Nav from '../Components/Nav'
import Landing from '../Components/Landing'

const page = () => {
  return (
    <div className='overflow-x-clip relative h-[200vh] w-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60  overflow-y-hidden'>
      
      <div className='bg-black'><Nav/></div>
      <div className='mt-10 px-2 py-16 md:p-16 md:px-9 lg:px-16 flex justify-center items-center sm:justify-normal sm:justify-items-normal'><Landing/></div>

      <div className='w-screen flex justify-center items-center mt-5 sm:mt-15'><div className='h-[2px] bg-orange-500 w-[80vw]'></div></div>

    </div>
  )
}

export default page