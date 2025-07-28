// Add this at the top to make it an interactive client component
'use client';

// Import necessary hooks and libraries
import React, { useState } from 'react';
import axios from 'axios';

import Google from '../../../public/google-icon.png';
import AuthBag from '../../../public/AuthBag.png';
import mdAuthBag from '../../../public/Right-and-left bag.png';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Page = () => {
  // 1. State to store email and password from the input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Function to handle the login logic
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // 3. Make the POST request using Axios
      const response = await axios.post('http://localhost:3000/api/Login', {
        email: email,
        pass: password,
      });

      // Handle a successful response
      console.log('Login successful:', response.data);
      alert('Login successful!');
      // You can redirect the user or save a token here
      
    } catch (error) {
      // Handle errors (e.g., wrong credentials, server error)
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='overflow-x-clip relative h-screen w-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60 flex justify-between items-center overflow-y-hidden'>
      <div className='h-full sm:h-[35em] w-full md:w-[60em] lg:w-[40em] pb-4 shadow-[1px_1px_6px_3px_rgba(0,_0,_0,_0.1)] sm:m-5 rounded-2xl flex-custom'>
        <h1 className={`${inter.className} text-5xl text-white font-bold pt-15 pb-5`}>Quic<span className='text-black'>kart</span></h1>

        {/* 4. Connect inputs to state */}
        <input
          placeholder='Your Email'
          className='login-input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder='Password'
          className='login-input'
          type="password" // Use type="password" for security
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* 5. Connect button to the handler function */}
        <button className='Log-button' onClick={handleLogin}>Log in</button>

        <button className='Log-google'>
          <span className="inline-block">
            <img src={Google.src} className="align-middle h-8" alt="Google icon" />
          </span>
          <span className='pl-4'>Continue with Google</span>
        </button>

        <div className='didntsignforget'>
          <p>Didn't Sign up Yet?</p>
          <p>Forget your password?</p>
        </div>
      </div>
      
      {/* The rest of your JSX remains the same... */}
      <div className='hidden lg:flex visible h-[35em] w-[45em] pb-4 m-5 rounded-2xl flex-col items-center'>
        <h1 className={`${inter.className} text-8xl text-shadow-lg text-white font-bold pt-15 pb-2 mb-7`}>Quic<span className='text-black'>kart</span></h1>
        <div className='text-[2.3em] font-semibold z-10'>
          <p className={`${inter.className} text-start h-9 w-[12.5em] text-shadow-sm`}>India's fastest</p>
          <p className={`${inter.className} text-end h-9 w-[12.5em] text-shadow-sm text-[#5E2615]`}>Delivering app</p>
        </div>
        <img className='absolute top-40 h-[43em] z-0' src={AuthBag.src} alt="Auth-Bag" />
      </div>
      <div className='hidden md:flex lg:hidden visible h-[35em] w-[20em] pb-4 m-5 rounded-2xl flex-col items-center'>
        <h1 className={`${inter.className} text-7xl text-shadow-lg text-white font-bold pt-15 pb-2 mb-7`}>Quic<span className='text-black'>kart</span></h1>
        <div className='text-[1.5em] font-semibold z-10'>
          <p className={`${inter.className} text-start h-9 w-[12.5em] text-shadow-sm`}>India's fastest</p>
          <p className={`${inter.className} text-end h-9 w-[12.5em] text-shadow-sm text-[#5E2615]`}>Delivering app</p>
        </div>
        <img className='absolute top-60 h-[25em] z-0' src={mdAuthBag.src} alt="Auth-Bag" />
      </div>
    </div>
  );
};

export default Page;