"use client"

import React from 'react'
import Headphone from '../../../public/ItemsHeadjacks.png'
import Mobile from '../../../public/ItemsMobile.png'
import Clothes from '../../../public/ItemsClothes.png'
import Sauce from '../../../public/Ketchup.png'
import Watch from '../../../public/ItemsWatch.png'
import { Inter } from 'next/font/google'
import {useRouter} from 'next/navigation';
import { CardsProdsDetail } from '../store/zuststore'


const inter = Inter({subsets:['latin']})

const ItemsArr = [
  {
    i:Headphone.src,
    p:'headphones'
  },
  {
    i:Mobile.src,
    p:"mobile"
  },
  {
    i:Clothes.src,
    p:'tshirt'
  },
  {
    i:Sauce.src,
    p:'sauce'
  },
  {
    i:Watch.src,
    p:'watches'
  }
]

const Items = () => {

    const router = useRouter()
  
    const { UpdateCard } = CardsProdsDetail()

    const redirectTo = (path:string,product:string) => {  
      UpdateCard(product)
      router.replace(path);  
  };
  return (
    <div className='ItemsDiv'>
      {
        ItemsArr.map((Item,idx)=>(
          <div
          onClick={()=>redirectTo(`/products/${Item.p}`,Item.p)}
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