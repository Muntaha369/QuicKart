'use client'

import React from 'react'
import Electronics from '@/app/Components/Electronics'
import StaticNav from '@/app/Components/StaticNav'

const page = () => {
  return (
    <div className='bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60'>
      <StaticNav/>
      <div className='mt-32'>
      <Electronics domain={'electronics'} />
      </div>
    </div>
  )
}

export default page