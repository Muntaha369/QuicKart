import React from 'react';

// --- Reusable Components ---

// 1. A reusable component for the product card skeleton
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
    <div className='w-full h-[35vw] sm:h-[25vw]  bg-gray-900 rounded-2xl mb-12 shadow-lg'>
      <div className='flex flex-col'>
        <h1 className='text-6xl w-20 font-bold bg-gradient-to-r from-[#665700] to-[#FFD700] text-transparent bg-clip-text'>Super Sonic</h1>
        <h1 className='inline bg-gradient-to-r text-2xl w-20 from-[#665700] to-[#FFD700] bg-clip-text text-transparent'>DEALS</h1>
        <p>Buy Electronics Gadgets</p>
        <p>under 30 000</p>

        <button>BUY NOW</button>
      </div>
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