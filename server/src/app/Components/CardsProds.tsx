'use client'

import React,{ useState, useEffect } from 'react'
import Reviews from '../../../public/reviews.png'
import StaticNav from '@/app/Components/StaticNav'
import axios from 'axios'
import {useRouter} from 'next/navigation';
import { productDetails } from '../store/zuststore';

type CardProdProps = {
  domain: string;
};

const CardsProds = ({domain}:CardProdProps) => {
  const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const { ChangeDetails } = productDetails()
    
      const router = useRouter()
    
      const redirectTo = (path:string, product:string, info:string, price:string, domain:string) => {
        router.replace(path);
        console.log(domain)
    
        ChangeDetails(product,product,info,price,domain)
        
      };
    
      useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data for domain:', domain);

        const res = await axios.post('http://localhost:3000/api/Get-Items/Get-All', { domain });
        
        console.log('Data received:', res.data.items);
        
        setProducts(res.data.items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 
  
  return (
    <div className='bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60'>
      <StaticNav/>
      <div className='mt-32'>
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
                <div key={idx} 
                onClick={() => redirectTo(`/home/${product.name}`,`${product.name}`,product.description, product.price,product.domain)}
                className='SkeletonDiv'>
                  <div className='h-[60%] flex justify-center items-center overflow-clip bg-white border-b-2'>
                    <img className='w-[50%] h-auto'
                     src={`/uploads/${product.name}.png`}
                     alt='PRODUCT-IMAGE'
                     />
                  </div>
                  <div className=' flex flex-col justify-center h-[40%] p-2'>
                    <p className='font-bold text-lg mb-1 overflow-clip text-[#5E2615] h-6'>{product.name}</p>
                    <p className='text-sm h-5 overflow-clip'>{product.description}</p>
                    <p className='text-[14px] text-orange-500'>More...</p>
                    <div className=' flex gap-3 items-center'>
                      <p className='text-[#5E2615] font-bold text-xl'>{product.price}</p>
                      <div className='flex justify-center items-center'>
                        <p className='text-orange-500 font-bold text-md'>4.5</p>
                        <img className='h-4 flex' src={Reviews.src} alt="none for now" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          
        </div>
      </div>
    </main>
      </div>
    </div>
  )
}

export default CardsProds