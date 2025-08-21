'use client';

import React, { useEffect } from 'react';
import { productDetails } from '@/app/store/zuststore';
import StaticNav from '@/app/Components/StaticNav';
import Electronics from '@/app/Components/Electronics';

const ProductPage = () => {
  // Use the Zustand store to get the details
  const { details, ChangeDetails } = productDetails();
  
  const syncWithLocalStorage = () => {
    const storedData = localStorage.getItem('productDetails');
    if (storedData) {
      const parsedData = JSON.parse(storedData)
    ChangeDetails(parsedData.img,parsedData.name,parsedData.desc,parsedData.price)  
    console.log(parsedData)   
    }
  };
  // Load state from localStorage on initial render
  useEffect(() => {
    syncWithLocalStorage();
  }, []);

  // Sync state to localStorage whenever the Zustand state changes
  useEffect(() => {
    if (details.name) { // Only save if the details are not empty
      localStorage.setItem('productDetails', JSON.stringify(details));
      console.log("Still issue")
    }
  }, []);

  return (
  <>
    <StaticNav></StaticNav>
    <div className=" mt-[126px] flex justify-center items-center min-h-screen bg-gradient-to-t from-[#FFD07E]/60 to-[#FF9A41]/60 p-4 font-inter">
      <div className="bg-[#FF6C41] rounded-xl shadow-2xl overflow-hidden max-h-4xl max-w-6xl w-screen p-8 flex flex-col md:flex-row gap-8">
        
        {/* Column 1: Product Image */}
        <div className="flex-1 flex h-[30rem] bg-white rounded-2xl border-2 shadow-md rounded-2xloverflow-y-scroll overflow-clip justify-center items-center p-4">
          <img 
            src={`/uploads/${details.img}.png`} 
            alt={details.name} 
            className="object-cover h-full rounded-lg"
            // Fallback for broken image
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/600x600/BDBDBD/000000?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Column 2: Product Details */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            {/* Product Name */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {details.name}
            </h1>
            {/* Product Description */}
            <p className="text-gray-200 text-lg leading-relaxed">
              {details.desc}
            </p>
          </div>

          <div className="flex items-baseline space-x-4">
            {/* Product Price */}
            <span className="text-4xl font-bold text-white">
              {details.price}
            </span>
            <span className="text-lg text-gray-500 line-through">
              $350.00
            </span>
          </div>

          {/* Buy Now Button */}
          <button className="w-full md:w-auto px-8 py-4 border-2 bg-white text-[#FF6C41]  font-bold rounded-lg shadow-lg hover:bg-[#FF6C41] hover:text-white transition duration-300 transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div className='bg-gradient-to-t from-[#FFD07E]/60 to-[#FF9A41]/60 border-t-4 border-t-[#FF6C41] '>
      <Electronics domain={'electronics'}/>
    </div>
    </>
  );
};

export default ProductPage;