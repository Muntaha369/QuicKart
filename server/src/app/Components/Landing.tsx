import React from 'react'
import { Inter } from 'next/font/google'
import AuthBag from '../../../public/AuthBag.png'

const inter = Inter({subsets:['latin']})

const Landing = () => {
  return (
    <div className='Hero'>
      <div className='HeroText'>
      <h1 className={` ${inter.className} QuickHero`}>Quic<span className='text-black'>kart</span></h1>

      <div className={`${inter.className} Herosubheading`}>
        <div className=' h-[35px] sm:h-[40px]'>
          <p>India's Fastest</p>
        </div>
        <div className='subStyle'>
          <p>Delivering app</p>
        </div>
      </div>

      <button 
      className={`${inter.className} HeroButton`}>
      Shop Now</button>
      </div>

      <img src={AuthBag.src} alt="AuthBag" />

    </div>
  )
}

export default Landing