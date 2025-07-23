'use client';

import React, { useState, useRef } from 'react'; // Import useRef

const types = ['Paintings', 'Photography', 'Decors', 'Artifacts'];

const AdminPage = () => {
  const [images, setImages] = useState<File[]>([]);
  // useRef to clear the file input field
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to Array and filter for allowed image types
      const newFiles = Array.from(e.target.files).filter(file =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      );
      // Append new files to existing ones
      setImages(prevImages => [...prevImages, ...newFiles]);
      // Clear the input field to allow selecting the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    // If all images are removed, also clear the file input
    if (images.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClearAllImages = () => {
    setImages([]);
    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pt-25 min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Add New Art</h2>

        {/* Type Dropdown */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Type</label>
          <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required>
            <option value="">Select type</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Label */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Title</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Description</label>
          <textarea className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" rows={3} required />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Upload Images</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef} 
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {images.length > 0 && ( // Only show image previews and cancel options if images exist
            <div className="mt-4 border p-3 rounded-lg bg-gray-50">
              <h3 className="text-gray-700 font-semibold mb-2">Uploaded Images:</h3>
              <div className="flex flex-wrap gap-2">
                {images.map((img, idx) => (
                  <div key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <span className="truncate max-w-xs">{img.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                      title={`Remove ${img.name}`}
                    >
                      &times; {/* HTML entity for multiplication sign, often used for close/remove */}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right">
                <button
                  type="button"
                  onClick={handleClearAllImages}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Clear All Images
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Medium */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Medium</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>

        {/* Size */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Size of the Item</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Price</label>
          <input type="number" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" required />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPage;