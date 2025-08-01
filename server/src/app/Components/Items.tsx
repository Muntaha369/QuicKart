import React from 'react'
import Headphone from '../../../public/ItemsHeadjacks.png'
import Mobile from '../../../public/ItemsMobile.png'
import Clothes from '../../../public/ItemsClothes.png'
import Sauce from '../../../public/Ketchup.png'
import Watch from '../../../public/ItemsWatch.png'
import { Inter } from 'next/font/google'

const inter = Inter({subsets:['latin']})

const ItemsArr = [
  {
    i:Headphone.src,
    p:'Headphone'
  },
  {
    i:Mobile.src,
    p:"Mobile"
  },
  {
    i:Clothes.src,
    p:'Clothes'
  },
  {
    i:Sauce.src,
    p:'Sause'
  },
  {
    i:Watch.src,
    p:'Watch'
  }
]

const Items = () => {
  return (
    <div className=' flex justify-center overflow-x-scroll items-center gap-9 py-5  px-20 mt-20'>
      {
        ItemsArr.map((Item,idx)=>(
          <div
          key={idx}
          className='transition-all duration-300 hover:cursor-pointer hover:scale-105 w-[10rem] h-[10rem] border-2 lg:shrink-1 shrink-0 lg:h-auto lg:w-full overflow-clip lg:aspect-square rounded-lg bg-[#FF9070] border-[#5E2615]'>
            <div className='w-full flex justify-center items-center h-[75%] border-[#5E2615] border-b-2'>
              <img className='w-[90%] h-[100%]' src={Item.i} alt="" />
            </div>
            <div className={`${inter.className} w-full h-[25%] flex justify-center font-semibold text-2xl text-[#5E2615] items-center bg-[#FFE9BE]`}>{Item.p}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Items