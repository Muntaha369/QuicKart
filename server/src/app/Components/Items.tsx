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
    <div className='ItemsDiv'>
      {
        ItemsArr.map((Item,idx)=>(
          <div
          key={idx}
          className='MappingDiv'>
            <div className='ItemImg'>
              <img className='w-[90%] h-[100%]' src={Item.i} alt="" />
            </div>
            <div className={`${inter.className} ItemP`}>{Item.p}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Items