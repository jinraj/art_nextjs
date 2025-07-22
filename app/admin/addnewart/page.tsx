'use client';

import React, { useState } from 'react';

const types = ['Paintings', 'Photography', 'Decors', 'Artifacts'];

const AdminPage = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter(file =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      );
      setImages(filesArray);
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
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, idx) => (
                <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded">{img.name}</span>
              ))}
            </div>
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