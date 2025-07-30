'use client'; // Add this to use state and handle clicks

import React, { useState } from 'react'; // Import useState
import { Inter } from 'next/font/google';
import SearchIcon from '../../../public/Vector.png';
import LoginIcon from '../../../public/LoginIcon.png';
import Electronics from '../../../public/Electronics.png';
import Fashion from '../../../public/Fashion.png';
import Essentials from '../../../public/Essentials.png';
import Beauty from '../../../public/Beauty.png';
import Health from '../../../public/Health.png';

const inter = Inter({ subsets: ['latin'] });

const itemsArr = [
  { items: 'Electronics', images: Electronics.src },
  { items: 'Fashion', images: Fashion.src },
  { items: 'Essentials', images: Essentials.src },
  { items: 'Beauty', images: Beauty.src },
  { items: 'Health', images: Health.src },
];

const Nav = () => {
  // State to manage the mobile menu's open/closed status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className='w-full border-b-2 backdrop-blur-md flex flex-col fixed top-0 z-50 p-2 sm:p-4 lg:px-12'>
      {/* --- TOP BAR --- */}
      <div className='flex justify-between items-center w-full'>
        {/* Logo */}
        <h1 className={`${inter.className} hidden sm:flex sm:text-3xl lg:text-5xl font-bold text-gray-800`}>
          Quic<span className='text-[#FF6C41]'>kart</span>
        </h1>

        {/* Search Bar - Hidden on mobile, visible on medium screens and up */}
        <div className='flex bg-white h-[3rem] rounded-lg overflow-clip '>
          <div className='w-[4rem] h-[3rem] border-r-2 border-r-amber-400 pr-3 pl-4 p-3.5 flex justify-center items-center'>
            <img src={SearchIcon.src} alt="Search" />
          </div>
          <input
            placeholder='Search Products...'
            className='px-3 text-lg flex placeholder:text-[#FF6C41] outline-none w-[60vw] md:w-[50vw] lg:w-[40vw] h-[3rem]'
            type="text"
          />
        </div>

        {/* Desktop Icons - Hidden on small screens, visible on large screens */}
        <div className='hidden lg:flex space-x-6 items-center'>
          <div>
            <div className='bg-white h-[2.2rem] w-[2.2rem] rounded-full flex justify-center items-center p-2.5'>
              <img src={LoginIcon.src} alt="Login" />
            </div>
            <p className='text-[#FF6C41] text-sm text-center'>Login</p>
          </div>
          <div>
            <div className='bg-white h-[2.2rem] w-[2.2rem] rounded-full flex justify-center items-center p-2.5'>
              <img src={LoginIcon.src} alt="Cart" />
            </div>
            <p className='text-[#FF6C41] text-sm text-center'>Cart</p>
          </div>
        </div>

        {/* Hamburger Menu Icon - Visible only on small screens */}
        <div className='lg:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* --- DESKTOP CATEGORY LINKS --- */}
      {/* Hidden on small screens, visible on large screens */}
      <div className='hidden lg:flex  space-x-11 mt-5'>
        {itemsArr.map((elem, idx) => (
          <div key={idx} className='flex items-center space-x-2 cursor-pointer'>
            <img className='h-[1rem] w-[1rem]' src={elem.images} alt={elem.items} />
            <p className={`${inter.className} text-[#FF6C41] text-sm`}>{elem.items}</p>
          </div>
        ))}
      </div>

      {/* --- MOBILE MENU --- */}
      {/* This block is shown or hidden based on the isMenuOpen state */}
      <div className={`lg:hidden mt-4 ${isMenuOpen ? 'flex' : 'hidden'} flex-col space-y-4`}>
        {itemsArr.map((elem, idx) => (
          <div key={idx} className='flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-gray-200'>
            <img className='h-[1rem] w-[1rem]' src={elem.images} alt={elem.items} />
            <p className={`${inter.className} text-gray-800 text-base`}>{elem.items}</p>
          </div>
        ))}
        {/* Add mobile login/cart links here */}
        <div className='border-t pt-4 space-y-4'>
            <div className='flex items-center space-x-2 cursor-pointer'><p>Login</p></div>
            <div className='flex items-center space-x-2 cursor-pointer'><p>Cart</p></div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;