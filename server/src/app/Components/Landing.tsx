import React from 'react'
import { Inter } from 'next/font/google'
import AuthBag from '../../../public/AuthBag.png'

const inter = Inter({subsets:['latin']})

const Landing = () => {
  return (
    <div className='flex flex-row justify-between'>
      <div className='z-10 w-screen sm:w-auto flex justify-center items-center flex-col '>
      <h1 className={` ${inter.className} text-[5.2rem] sm:text-8xl text-white font-bold text-shadow-lg/15`}>Quic<span className='text-black'>kart</span></h1>

      <div className={`${inter.className} sm:ml-15 flex font-semibold flex-col w-80 sm:w-96 mt-8 text-3xl sm:text-[2rem]`}>
        <div className=' h-[35px] sm:h-[40px]'>
          <p>India's Fastest</p>
        </div>
        <div className='flex justify-end items-center h-[35px] sm:h-[40px] text-[#5E2615]'>
          <p>Delivering app</p>
        </div>
      </div>

      <button 
      className={`${inter.className} text-white font-bold hover:scale-110 transition-all hover:cursor-pointer 
      active:bg-[#e16843] active:scale-105 text-3xl sm:text-4xl px-7 mt-8 pb-2 pt-2 flex justify-center border border-[#5E2615] items-center 
      rounded-xl bg-[#FF6C41]`}>
      Shop Now</button>
      </div>

      <img className=' hidden sm:flex sm:right-[-300px] md:right-[-220px] h-[37rem] z-0 absolute top-0 lg:right-0' src={AuthBag.src} alt="" />

    </div>
  )
}

export default Landing