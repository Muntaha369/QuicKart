"use client"

import React from 'react'
import CardsProds from '@/app/Components/CardsProds'
import { CardsProdsDetail } from '../../store/zuststore'

const page = () => {

  const { card } = CardsProdsDetail()
  console.log(card)
  return (
        <CardsProds domain={card}/>
  )
}

export default page