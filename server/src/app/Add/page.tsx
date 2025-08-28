'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// A mock API URL. You will need to replace this with your actual API endpoint.
const API_URL = 'http://localhost:3000/api/add-product';

// Main component for the Add New Product page
const page = () => {
  // State to hold form data and the image file
  const [formData, setFormData] = useState({
    domain: '',
    subdomain: '',
    name: '',
    price: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Handle changes in form inputs
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes in the file input and create an image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreviewUrl(fileUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if an image is selected
    if (!imageFile) {
      setStatusMessage('Please select a product image.');
      return;
    }

    setStatusMessage('Adding product...');

    // Create a FormData object to send both text data and the file
    const data = new FormData();
    data.append('domain', formData.domain);
    data.append('subdomain', formData.subdomain);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('productImage', imageFile); // The key 'productImage' should match your server's expected field name

    try {
      // Send the data to the API
      const response = await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added successfully:', response.data);
      setStatusMessage('Product added successfully!');
      
      // Reset the form after successful submission
      setFormData({
        domain: '',
        subdomain: '',
        name: '',
        price: '',
        description: '',
      });
      setImageFile(null);
      setImagePreviewUrl(null);

    } catch (error) {
      console.error('Error adding product:', error);
      setStatusMessage('Error adding product. Please try again.');
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60 p-4 ${inter.className}`}>
      <div className="bg-orange-500 rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
        
        {/* Left Column: Image Preview */}
        <div className="flex-1 flex justify-center items-center bg-gray-200 p-8">
          <div className="w-full h-full max-h-[400px] flex justify-center items-center overflow-hidden rounded-lg shadow-inner bg-gray-300">
            {imagePreviewUrl ? (
              <img 
                src={imagePreviewUrl} 
                alt="Product Preview" 
                className="object-contain w-full h-full" 
              />
            ) : (
              <p className="text-gray-500">Image Preview</p>
            )}
          </div>
        </div>
        
        {/* Right Column: Form */}
        <div className="flex-1 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Input Fields */}
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-white">Domain</label>
              <input type="text" id="domain" name="domain" value={formData.domain} onChange={handleInputChange} required className="mt-1 block w-full hover:border-2 border-2 border-orange-400 bg-white p-1 rounded-md  shadow-sm outline-0 focus:border-orange-600 focus:ring-orange-600" />
            </div>
            
            <div>
              <label htmlFor="subdomain" className="block text-sm font-medium text-white">Subdomain</label>
              <input type="text" id="subdomain" name="subdomain" value={formData.subdomain} onChange={handleInputChange} required className="mt-1  hover:border-2 border-2 border-orange-400 block bg-white p-1 w-full rounded-md  shadow-sm focus:border-orange-600 outline-0 focus:ring-orange-600" />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">Product Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block outline-0 bg-white p-1 w-full rounded-md hover:border-2 border-2 border-orange-400 shadow-sm focus:border-orange-600 focus:ring-orange-600" />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} required className="mt-1 outline-0 bg-white p-1 block w-full rounded-md hover:border-2 border-2 border-orange-400 shadow-sm focus:border-orange-600 focus:ring-orange-600" />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="mt-1 block bg-white p-2 w-full rounded-md hover:border-2 border-2 border-orange-400 outline-0 shadow-sm focus:border-orange-600 focus:ring-orange-600"></textarea>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white">Product Image</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-orange-500 font-bold rounded-lg shadow-lg hover:bg-orange-500 hover:text-white hover:border-2 border-2 hover:border-white hover:cursor-pointer transition duration-300"
            >
              Add Product
            </button>
            
            {statusMessage && (
              <p className="text-center text-sm font-medium mt-4">{statusMessage}</p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
