"use client";

import React, { useEffect } from 'react';
import { productDetails } from '@/app/store/zuststore';
import StaticNav from '@/app/Components/StaticNav';
import Electronics from '@/app/Components/Electronics';
import axios from 'axios';

// Add Razorpay type to the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}

const ProductPage = () => {
  // Use the Zustand store to get the details
  const { details, ChangeDetails } = productDetails();
  
  const syncWithLocalStorage = () => {
    const storedData = localStorage.getItem('productDetails');
    if (storedData) {
      const parsedData = JSON.parse(storedData)
    ChangeDetails(parsedData.img,parsedData.name,parsedData.desc,parsedData.price,parsedData.domain)  
    // setDomain(parsedData.domain)
    console.log(parsedData.domain)   
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
      console.log(details)
    }
  }, []);

  function loadScript(src:any) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

  const paymentHandler = async (e:any)=>{

    // FIX: Remove the Rupee symbol and convert to an integer
    function cleanPrice(priceString: string) {
      const sanitizedString = priceString.replace('₹', '');
      return parseInt(sanitizedString) * 100; // Convert to paise
    }

    const newPrice = cleanPrice(details.price);

    console.log(newPrice);
            
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      
      // Call the backend API to create a new order
      
    // FIX: Send a number in the amount field
    const orderResponse = await axios.post('http://localhost:3000/api/Razorpay/orders', {amount:newPrice})
    console.log(orderResponse.data)

    if (!orderResponse.data) {
      alert("Server error. Are you online?");
      return;
    }

    const { order_id } = orderResponse.data;

var options = {
    // FIX: Use environment variables for security
    "key": "rzp_test_RCFP95WTZXuXsq", 
    "amount": newPrice, 
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": order_id,
    "handler": function (response:any) {
      // You can add your verification logic here
      alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
}


  

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
          <button 
          onClick={paymentHandler}
          className="w-full md:w-auto px-8 py-4 border-2 bg-white text-[#FF6C41]  font-bold rounded-lg shadow-lg hover:bg-[#FF6C41] hover:text-white transition duration-300 transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div className='bg-gradient-to-t from-[#FFD07E]/60 to-[#FF9A41]/60 border-t-4 border-t-[#FF6C41] '>
    { details.domain !=="" &&
      <Electronics domain={details.domain}/>
    }
    </div>
    </>
  );
};

export default ProductPage;