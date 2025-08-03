'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios'
import ElecDealmd from '../../../public/ElecDealmd.png'
import ElecDealsm from '../../../public/Elecdealsm.png'
import { Julius_Sans_One } from 'next/font/google';
// --- Reusable Components ---

// 1. A reusable component for the product card skeleton

const JuliusSansOne = Julius_Sans_One({subsets:['latin'], weight:['400']})

const HeroBanner = () => {
  return (
    <div className='HeroDiv'>
      <div className='flex flex-col w-[50%] z-10'>
        <h1 className='SuperSonic'>Super Sonic</h1>
        <h1 className={` ${JuliusSansOne.className} Deals`}>DEALS</h1>
        <p className='HeroSub1'>Buy Electronics Gadgets</p>
        <p className='HeroSub2'>under 30 000</p>

        <div className="HeroButtonHolder">

          <button>
            <span>
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
  const [products, setProducts] = useState([]); // Use a more descriptive name
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domain = 'electronics';
        console.log('Fetching data for domain:', domain);

        const res = await axios.post('http://localhost:3000/api/Get-Items/Electronics', { domain });
        
        console.log('Data received:', res.data.items);
        
        setProducts(res.data.items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false); // Stop loading after the request is done
      }
    };

    fetchData();
  }, []); 

  return (
    <main className='ElecMain'>
      <div className='w-full max-w-7xl'>
        <HeroBanner />

        <div className='ElecMap'>
          {isLoading
            ? 
              Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className='SkeletonDiv animate-pulse'>
                  <div className='h-[60%] bg-gray-200'></div>
                  <div className='h-[40%] p-3 space-y-2'>
                    <div className='h-4 bg-gray-300 rounded'></div>
                  </div>
                </div>
              ))
            : // Show the actual product data once loaded
              products.map((product:any, idx) => (
                <div key={idx} className='SkeletonDiv'>
                  <div className='h-[60%] bg-gray-100 border-b-2'>
                    {/* <img src={product.imageUrl} /> */}
                  </div>
                  <div className='h-[40%] p-3'>
                    <p className='font-bold'>{product.name}</p>
                  </div>
                </div>
              ))}
          
          <div className='ElecButton'>
            <button className='
            bg-[#FF6C41] hover:cursor-pointer 
             active:scale-100 rounded-lg w-full 
             aspect-[4/5] font-bold text-white 
             text-4xl border-2 border-black 
             hover:scale-105 transition-all'>
            <p className='mb-2'> Click See More</p>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Electronics;