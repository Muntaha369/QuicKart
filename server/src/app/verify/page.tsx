"use client"

import React,{useState} from 'react'
import { Inter } from 'next/font/google'
import axios from 'axios'
import { userDetails } from '../store/zuststore'

const inter = Inter({subsets:['latin']})


const page = () => {

  const [otp, setOtp] = useState('')
  const { details } = userDetails()

  const Verify = async()=>{
try {
    const res = await axios.post('http://localhost:3000/api/Verify-otp',{
      email: details.email,
      pass: details.pass,
      otp:otp
    })
    console.log(res)
    console.log(details.email, details.pass)

} catch (error) {
  console.log(error)
}
}

  return (
    <div className='h-screen w-screen flex justify-center pt-12  bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60'>
      <div className='verifyinput'>
        <input onChange={(e)=>setOtp(e.target.value)} type="text" />
        <button
        onClick={Verify}
        className={`${inter.className}`}>Verify</button>
      </div>
    </div>
  )
}

export default page