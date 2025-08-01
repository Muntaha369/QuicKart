import React from 'react';
import ElecDealmd from '../../../public/ElecDealmd.png'
import ElecDealsm from '../../../public/Elecdealsm.png'
import { Julius_Sans_One } from 'next/font/google';
import { plugin } from 'mongoose';
// --- Reusable Components ---

// 1. A reusable component for the product card skeleton

const JuliusSansOne = Julius_Sans_One({subsets:['latin'], weight:['400']})

const ProductCardSkeleton = () => {
  return (
    <div className='w-full aspect-[4/5] hover:cursor-pointer active:scale-100 bg-[#FFEB9E] rounded-lg  overflow-hidden border-2 hover:scale-105 transition-all'>
      {/* Image Placeholder */}
      <div className='h-[60%] bg-gray-200 border-b-2'></div>
      {/* Details Placeholder */}
      <div className='h-[40%] p-3 space-y-2'>
        {/* <div className='h-4 bg-gray-200 rounded '></div>
        <div className='h-4 w-1/2 bg-gray-200 rounded '></div> */}
      </div>
    </div>
  );
};

// 2. A component for the top banner
const HeroBanner = () => {
  return (
    <div className='w-full flex  items-center h-[20rem] py-3.5 px-6 md:px-12 bg-black rounded-2xl mb-12 shadow-lg overflow-hidden'>
      <div className='flex flex-col w-[50%] z-10'>
        <h1 className=' text-5xl sm:text-6xl font-bold mt-0 bg-gradient-to-r from-[#806d01] to-[#FFD700] text-transparent w-[21rem] bg-clip-text'>Super Sonic</h1>
        <h1 className={` ${JuliusSansOne.className} inline pt-2 bg-gradient-to-r text-4xl w-28 from-[#665700] to-[#FFD700] bg-clip-text text-transparent`}>DEALS</h1>
        <p className='text-transparent mt-6 font-bold text-2xl bg-gradient-to-r from-[#606060] to-white w-68 bg-clip-text'>Buy Electronics Gadgets</p>
        <p className='text-transparent font-bold text-2xl bg-gradient-to-r from-[#606060] to-white w-68 bg-clip-text'>under 30 000</p>

        <div className="rounded-lg mt-7 hover:scale-105 transition-all duration-300 active:scale-100 w-42 p-[2px] bg-gradient-to-r from-[#806d01] mb-4 to-[#FFD700]">

          {/* 2. The Inner button has its own background */}
          <button className="
            w-full font-bold
            px-6 py-2 rounded-md
            hover:cursor-pointer
            group">

            <span className="
              bg-gradient-to-r from-[#665700] to-[#FFD700]
              bg-clip-text text-black/75">
              BUY NOW
            </span>
            
          </button>

        </div>
      </div>

      <img 
      className='hidden md:flex'
      src={ElecDealmd.src} alt="Elecdeal" />

      <img
      className='z-0'
      src={ElecDealsm.src} alt="Elecdeal" />
    </div>
  );
};


// --- Main Page Component ---

const Electronics = () => {
  // 3. Simulating a list of products to display
  const products = Array.from({ length: 8 }); // Create an array of 10 items

  return (
    <main className='w-full flex flex-col items-center overflow-clip mt-20 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-7xl '>
        <HeroBanner />

        {/* 4. Using CSS Grid for a fully responsive layout */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8'>
          {products.map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}

          <div className='flex justify-center  items-center w-full aspect-[4/5]'>

            <button className='bg-[#FF6C41] hover:cursor-pointer active:scale-100 rounded-lg w-full aspect-[4/5] font-bold text-white text-4xl border-2 border-black hover:scale-105 transition-all'><p className='mb-2'> Click See More</p></button>

          </div>

        </div>
      </div>
    </main>
  );
};

export default Electronics;