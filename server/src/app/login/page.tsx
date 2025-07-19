import React from 'react'
import Google from '../../../public/google-icon.png'
import AuthBag from '../../../public/AuthBag.png'
import mdAuthBag from '../../../public/Right-and-left bag.png'
import { Inter } from 'next/font/google'

const inter = Inter({subsets:['latin']})

const page = () => {
  return (
    <div className=' overflow-x-clip relative h-screen w-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60 flex justify-between items-center overflow-y-hidden'>
      <div className=' h-full sm:h-[35em] w-full md:w-[60em] lg:w-[40em] pb-4 shadow-[1px_1px_6px_3px_rgba(0,_0,_0,_0.1)] sm:m-5 rounded-2xl flex-custom '>
        <h1 className={`${inter.className} text-5xl text-white font-bold pt-15 pb-5`}>Quic<span className='text-black'>kart</span></h1>
        <input placeholder='Your Email' className='login-input' type="email" />
        <input placeholder='Password' className='login-input' type="text" />
        <button className='Log-button'>Log in</button>
        <button className='Log-google'>
        <span className="inline-block">
          <img src={Google.src} className="align-middle h-8" />
        </span>
          <span className='pl-4'>Continue with Google</span></button>
        <div className='didntsignforget'>
          <p>Didn't Sign up Yet?</p> 
          <p>Forget your password?</p>
        </div>
      </div>
      <div className=' hidden lg:flex visible h-[35em] w-[45em] pb-4 m-5 rounded-2xl  flex-col items-center'>
        <h1 className={`${inter.className} text-8xl text-shadow-lg text-white font-bold pt-15 pb-2 mb-7`}>Quic<span className='text-black'>kart</span></h1>
        <div className='text-[2.3em] font-semibold z-10'>
          <p className={`${inter.className} text-start h-9 w-[12.5em] text-shadow-sm`}>India's fastest</p>
          <p className={`${inter.className} text-end h-9 w-[12.5em] text-shadow-sm text-[#5E2615]`}>Delivering app</p>
        </div>
        <img className='absolute top-40 h-[43em] z-0' src={AuthBag.src} alt="Auth-Bag" />
      </div>

      <div className='hidden md:flex lg:hidden visible h-[35em] w-[20em] pb-4 m-5 rounded-2xl  flex-col items-center'>
        <h1 className={`${inter.className} text-7xl text-shadow-lg text-white font-bold pt-15 pb-2 mb-7`}>Quic<span className='text-black'>kart</span></h1>

         <div className='text-[1.5em] font-semibold z-10'>
          <p className={`${inter.className} text-start h-9 w-[12.5em] text-shadow-sm`}>India's fastest</p>
          <p className={`${inter.className} text-end h-9 w-[12.5em] text-shadow-sm text-[#5E2615]`}>Delivering app</p>
        </div>

        <img className='absolute top-60 h-[25em] z-0' src={mdAuthBag.src} alt="Auth-Bag" />

      </div>

    </div>
  )
}

export default page