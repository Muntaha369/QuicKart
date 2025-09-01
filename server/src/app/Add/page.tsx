'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// ✅ Replace with your correct API route
const API_URL = '/api/Add-Items';

const Page = () => {
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

  // Handle input text changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      setStatusMessage('❌ Please select a product image.');
      return;
    }

    setStatusMessage('⏳ Adding product...');

    const data = new FormData();
    data.append('domain', formData.domain);
    data.append('subdomain', formData.subdomain);
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);

    // ✅ MUST match backend key (your backend expects `file`)
    data.append('file', imageFile);

    try {
      const response = await axios.post(API_URL, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Product added:', response.data);
      setStatusMessage('✅ Product added successfully!');

      // Reset form
      setFormData({ domain: '', subdomain: '', name: '', price: '', description: '' });
      setImageFile(null);
      setImagePreviewUrl(null);
    } catch (error) {
      console.error('❌ Error adding product:', error);
      setStatusMessage('❌ Error adding product. Please try again.');
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gradient-to-b from-[#FFD07E]/60 to-[#FF9A41]/60 p-4 ${inter.className}`}
    >
      <div className="bg-orange-500 rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full flex flex-col md:flex-row">
        {/* Image Preview */}
        <div className="flex-1 flex justify-center items-center bg-gray-200 p-8">
          <div className="w-full h-full max-h-[400px] flex justify-center items-center overflow-hidden rounded-lg shadow-inner bg-gray-300">
            {imagePreviewUrl ? (
              <img src={imagePreviewUrl} alt="Product Preview" className="object-contain w-full h-full" />
            ) : (
              <p className="text-gray-500">Image Preview</p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="domain" value={formData.domain} onChange={handleInputChange} placeholder="Domain" required className="w-full border-2 border-orange-400 p-2 rounded-md focus:border-orange-600 outline-none" />

            <input type="text" name="subdomain" value={formData.subdomain} onChange={handleInputChange} placeholder="Subdomain" required className="w-full border-2 border-orange-400 p-2 rounded-md focus:border-orange-600 outline-none" />

            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" required className="w-full border-2 border-orange-400 p-2 rounded-md focus:border-orange-600 outline-none" />

            <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" required className="w-full border-2 border-orange-400 p-2 rounded-md focus:border-orange-600 outline-none" />

            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required className="w-full border-2 border-orange-400 p-2 rounded-md focus:border-orange-600 outline-none"></textarea>

            <input type="file" accept="image/*" onChange={handleImageChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

            <button type="submit" className="w-full px-4 py-2 bg-white text-orange-500 font-bold rounded-lg shadow-lg hover:bg-orange-500 hover:text-white transition">
              Add Product
            </button>

            {statusMessage && <p className="text-center text-sm font-medium mt-4">{statusMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
