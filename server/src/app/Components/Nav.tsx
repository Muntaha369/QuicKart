'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Fuse from 'fuse.js';
import { Inter } from 'next/font/google';
import SearchIcon from '../../../public/Vector.png';
import LoginIcon from '../../../public/LoginIcon.png';
import Electronics from '../../../public/Electronics.png';
import Fashion from '../../../public/Fashion.png';
import Essentials from '../../../public/Essentials.png';
import Beauty from '../../../public/Beauty.png';
import Health from '../../../public/Health.png';
import Cart from '../../../public/Kart.png';
import {useRouter} from 'next/navigation';
import { CardsProdsDetail } from '../store/zuststore';

const inter = Inter({ subsets: ['latin'] });

const itemsArr = [
  { items: 'Electronics', images: Electronics.src },
  { items: 'Fashion', images: Fashion.src },
  { items: 'Essentials', images: Essentials.src },
  { items: 'Beauty', images: Beauty.src },
  { items: 'Health', images: Health.src },
];

const Nav = () => {
    const { UpdateCard } = CardsProdsDetail();

    const [products, setProducts] = useState([]);
    const [navValue, setNavValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const router = useRouter();
    const navRef = useRef(null);
    const categoryContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/Get-Items/Get-AllData');
                setProducts(res.data.products || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
      if (navValue.length > 0) {
        const fuseOptions = {
          keys: ['name'],
          threshold: 0.3,
        };
        
        const fuse = new Fuse(products, fuseOptions);
        
        const results = fuse.search(navValue);

        console.log(results)
        
        setSearchResults(results.map(result => result.item));
        console.log(searchResults)
      } else {
        setSearchResults([]);
      }
    }, [navValue, products]); 

    const redirecto = () => {
        router.replace('/home');
    };

    const handleSearchChange = (e:any) => {
        const value = e.target.value;
        UpdateCard(value)
        setNavValue(value);
    };

    const handleSearchClick = (productName:any) => {
      router.replace(`/p/${productName}`);
      setSearchResults([]);
      setNavValue("");
    }

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (categoryContainerRef.current) {
            ScrollTrigger.create({
                trigger: categoryContainerRef.current,
                start: '200% 10%',
                end: '4900% 10%',
                toggleClass: {
                    targets: navRef.current,
                    className: 'sunshine',
                },
            });
        }
    }, []);

    return (
        <nav ref={navRef} className='navbar nav1'>
            {/* --- TOP BAR --- */}
            <div className='navflex'>
                <div onClick={redirecto}>
                    <h1 className={`${inter.className} quickText`}>
                        Quic<span className='text-[#FF6C41]'>kart</span>
                    </h1>
                </div>
                <div className='searchBarHolder relative'>
                    <div className='searchButton' onClick={() => handleSearchClick(navValue)}>
                        <img src={SearchIcon.src} alt="Search" />
                    </div>
                    <input
                        onChange={handleSearchChange}
                        value={navValue}
                        placeholder='Search Products...'
                        className='searchBar'
                        type="text"
                    />
                    {/* Search Results Dropdown */}
                    {searchResults.length > 0 && (
                        <div className="fixed top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                            {searchResults.map((product:String,idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {handleSearchClick(product); UpdateCard(product)}}
                                    className="p-2 cursor-pointer text-black hover:bg-gray-200"
                                >
                                    {product}
                                </div>
                            ))}
                        </div>
                    )}
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
            <div ref={categoryContainerRef} className='catagoryContainer overflow-x-scroll'>
                {itemsArr.map((elem, idx) => (
                    <div key={idx} className='flex items-center space-x-2 cursor-pointer'>
                        <img className='h-[1rem] w-[1rem]' src={elem.images} alt={elem.items} />
                        <p className={`${inter.className} text-[#FF6C41] text-sm`}>{elem.items}</p>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Nav;