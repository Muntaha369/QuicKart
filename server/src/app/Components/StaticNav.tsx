import React from 'react'
import SearchIcon from '../../../public/Vector.png';
import LoginIcon from '../../../public/LoginIcon.png';
import Electronics from '../../../public/Electronics.png';
import Fashion from '../../../public/Fashion.png';
import Essentials from '../../../public/Essentials.png';
import Beauty from '../../../public/Beauty.png';
import Health from '../../../public/Health.png';
import Cart from '../../../public/Kart.png';
import { Inter } from 'next/font/google';


const itemsArr = [
  { items: 'Electronics', images: Electronics.src },
  { items: 'Fashion', images: Fashion.src },
  { items: 'Essentials', images: Essentials.src },
  { items: 'Beauty', images: Beauty.src },
  { items: 'Health', images: Health.src },
];

const inter = Inter({ subsets: ['latin'] });



const StaticNav = () => {
  return (
    <nav  className='sunshine Staticnavbar nav1'>
      {/* --- TOP BAR --- */}
      <div className='navflex'>
        <h1 className={`${inter.className} quickText`}>
          Quic<span className='text-[#FF6C41]'>kart</span>
        </h1>
        <div className='searchBarHolder'>
          <div className='searchButton'>
            <img src={SearchIcon.src} alt="Search" />
          </div>
          <input
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
      <div  className='catagoryContainer overflow-x-scroll'>
        {itemsArr.map((elem, idx) => (
          <div key={idx} className='flex items-center space-x-2 cursor-pointer'>
            <img className='h-[1rem] w-[1rem]' src={elem.images} alt={elem.items} />
            <p className={`${inter.className} text-[#FF6C41] text-sm`}>{elem.items}</p>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default StaticNav