import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({subsets:['latin']})

const page = () => {
  return (
    <div className='h-screen w-screen flex justify-center pt-12  bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60'>
      <div className='verifyinput'>
        <input type="text" />
        <button className={`${inter.className}`}>Verify</button>
      </div>
    </div>
  )
}

export default page