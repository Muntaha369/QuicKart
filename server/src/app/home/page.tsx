import React from 'react'
import Nav from '../Components/Nav'
import Landing from '../Components/Landing'

const page = () => {
  return (
    <div className='overflow-x-clip relative h-[200vh] w-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60  overflow-y-hidden'>
      
      <div className='bg-black'><Nav/></div>
      <div className='LandingHolder'><Landing/></div>

      <div className='LandingLine'><div></div></div>

    </div>
  )
}

export default page