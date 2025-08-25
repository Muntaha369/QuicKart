'use client'
import React from 'react'
import CardsProds from '@/app/Components/CardsProds'
import { CardsProdsDetail } from '../../store/zuststore'

const page = () => {

  const { card } = CardsProdsDetail()

  return (
    <CardsProds domain={card}/>
  )
}

export default page