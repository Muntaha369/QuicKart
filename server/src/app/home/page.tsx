import React from 'react'
import Nav from '../Components/Nav'
import Landing from '../Components/Landing'
import Electronics from '../Components/Electronics'
import Items from '../Components/Items'
import Ad from '../Components/Ad'

const page = () => {
  return (
    <div className='overflow-x-clip relative w-full max-w-7xl bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60  overflow-y-hidden'>
      
      <div className='bg-black'><Nav/></div>
      <div className='LandingHolder'><Landing/></div>

      <div className='LandingLine'><div></div></div>
      <Items/>
      <Ad/>
      <Electronics domain={'electronics'}/>
      {/* <Ad/>
      <Electronics domain={'fashion'} /> */}
    </div>
  )
}

export default page