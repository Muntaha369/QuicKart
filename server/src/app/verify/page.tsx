import React from 'react'
import { Inter } from 'next/font/google'

const inter = Inter({subsets:['latin']})

const page = () => {
  return (
    <div className='h-screen w-screen flex justify-center pt-12  bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60'>
      <div className=' py-13 flex justify-between flex-col items-center shadow-[1px_1px_6px_3px_rgba(0,_0,_0,_0.1)] h-[17em] w-[17em] sm:w-[30em] rounded-2xl'>
        <input className='h-[2.3em] hover:cursor-pointer text-center font-bold tracking-[0.3em] w-[70%] border-2 rounded-lg text-3xl text-[#5E2615] outline-0 border-[#5E2615]' type="text" />
        <button className={`${inter.className} hover:cursor-pointer hover:bg-[#FF6C41]/90 h-[2.3em] w-[70%] text-white text-3xl font-bold bg-[#FF6C41] rounded-lg`}>Verify</button>
      </div>
    </div>
  )
}

export default page