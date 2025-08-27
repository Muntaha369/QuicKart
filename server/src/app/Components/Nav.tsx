'use client';

import React, { useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Inter } from 'next/font/google';
import SearchIcon from '../../../public/Vector.png';
import LoginIcon from '../../../public/LoginIcon.png';
import Electronics from '../../../public/Electronics.png';
import Fashion from '../../../public/Fashion.png';
import Essentials from '../../../public/Essentials.png';
import Beauty from '../../../public/Beauty.png';
import Health from '../../../public/Health.png';
import Cart from '../../../public/Kart.png';
import {useRouter} from 'next/navigation';
import { CardsProdsDetail } from '../store/zuststore';

const inter = Inter({ subsets: ['latin'] });

const itemsArr = [
  { items: 'Electronics', images: Electronics.src },
  { items: 'Fashion', images: Fashion.src },
  { items: 'Essentials', images: Essentials.src },
  { items: 'Beauty', images: Beauty.src },
  { items: 'Health', images: Health.src },
];

const Nav = () => {

    const { UpdateCard } = CardsProdsDetail()

    const [navValue, setNavValue] = useState("")

    const router = useRouter()

    const redirecto = ()=>{
      router.replace('/home');
      console.log("CLICKING")
    }

    const redirectoProduct = ()=>{
      router.replace(`/p/${navValue}`)
    }
  
  // 1. Create refs for the elements we want to animate
  const navRef = useRef(null);
  const categoryContainerRef = useRef(null); // Ref for the parent container

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (categoryContainerRef.current) {
      ScrollTrigger.create({
        trigger: categoryContainerRef.current,
        start: '200% 10%', // When the top of the container hits 10% from the top of the viewport
        end: '4900% 10%', // When the bottom of the container hits 10% from the top of the viewport
        toggleClass: {
          targets: navRef.current, // The element to toggle the class on
          className: 'sunshine',   // The class to add/remove
        },
        // markers: true, // Keep for debugging, remove for production
      });
    }
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    <nav ref={navRef} className='navbar nav1'>
      {/* --- TOP BAR --- */}
      <div className='navflex'>
        <div
        onClick={redirecto}>
          <h1 
          className={`${inter.className} quickText`}>
            Quic<span className='text-[#FF6C41]'>kart</span>
          </h1>
        </div>
        <div className='searchBarHolder'>
          <div 
          onClick={redirectoProduct}
          className='searchButton'>
            <img src={SearchIcon.src} alt="Search" />
          </div>
          <input
            onChange={(e)=>{setNavValue(e.target.value); UpdateCard(e.target.value)}}
            placeholder='Search Products...'
            className='searchBar'
            type="text"
          />
        </div>
        <div className=' scale-75 sm:scale-100 flex space-x-2 lg:space-x-6 items-center'>
          <div>
            <div className='bg-white h-[2.2rem] w-[2.2rem] rounded-full flex justify-center items-center p-2.5 border-1 border-[#FF6C41]'>
              <img src={LoginIcon.src} alt="Login" />
            </div>
            <p className='text-[#FF6C41] text-sm text-center'>Login</p>
          </div>
          <div>
            <div className='bg-white h-[2.2rem] w-[2.2rem] rounded-full flex justify-center items-center p-2.5 border-1 border-[#FF6C41]'>
              <img src={Cart.src} alt="Cart" />
            </div>
            <p className='text-[#FF6C41] text-sm text-center'>Cart</p>
          </div>
        </div>
      </div>

      {/* --- DESKTOP CATEGORY LINKS --- */}
      {/* 3. Attach the ref to the parent container */}
      <div ref={categoryContainerRef} className='catagoryContainer overflow-x-scroll'>
        {itemsArr.map((elem, idx) => (
          <div key={idx} className='flex items-center space-x-2 cursor-pointer'>
            <img className='h-[1rem] w-[1rem]' src={elem.images} alt={elem.items} />
            <p className={`${inter.className} text-[#FF6C41] text-sm`}>{elem.items}</p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Nav;