'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios'

// --- Reusable Components ---


type ElectronicsProps = {
  domain: string;
};

const Electronics = ({domain}:ElectronicsProps) => { 
  const [products, setProducts] = useState([]); // Use a more descriptive name
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    <main className='ElecMain2'>
      <div className='w-full max-w-7xl'>
        <div className='ElecMap my-3'>
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
                  <div className='h-[60%] flex justify-center items-center overflow-clip bg-white border-b-2'>
                    <img className='w-[50%] h-'
                     src={`/uploads/${product.name}.png`}
                     alt='PRODUCT-IMAGE'
                     />
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