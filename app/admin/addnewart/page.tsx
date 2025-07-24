'use client';

import React, { useState, useRef } from 'react';
import { artTypes, artworkFormInit } from '@/app/constants/meta';

const AdminPage = () => {
  const [formData, setFormData] = useState(artworkFormInit);

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file =>
        ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      );
      setImages(prevImages => [...prevImages, ...newFiles]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    if (images.length === 1 && fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearAllImages = () => {
    setImages([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    console.log(`Field changed: ${e.target}`);
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log("Submitting form data...", formData);
    // Append images manually
    images.forEach((image) => {
      formData.append('images', image); // Key name must match backend expectation
    });

    console.log("with images form data...", formData);
    try {
      const res = await fetch('/api/artwork', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Something went wrong');

      alert('Artwork added successfully!');
      setFormData(artworkFormInit);
      handleClearAllImages();
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error submitting artwork');
    }
  };

  return (
    <div className="pt-25 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-700">Add New Art</h2>

        {/* Type Dropdown */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Art Type</label>
          <select
            name="artType"
            value={formData.artType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="">Select type</option>
            {artTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={3}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Upload Images</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            name='images'
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          {images.length > 0 && (
            <div className="mt-4 border p-3 rounded-lg bg-gray-50">
              <h3 className="text-gray-700 font-semibold mb-2">Uploaded Images:</h3>
              <div className="flex flex-wrap gap-2">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    <span className="truncate max-w-xs">{img.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="ml-2 text-blue-600 hover:text-blue-900 focus:outline-none"
                      title={`Remove ${img.name}`}
                    >
                      &times;
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

        {/* Dimension */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Dimension</label>
          <input
            type="text"
            name="dimension"
            value={formData.dimension}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Medium */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Medium</label>
          <input
            type="text"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>

        {/* Artist Name */}
        <div>
          <label className="block text-gray-600 mb-2 font-semibold">Artist Name</label>
          <input
            type="text"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center space-x-4">
          <div>
            <input
              type="checkbox"
              id="isHidden"
              name="isHidden"
              checked={formData.isHidden}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isHidden" className="text-gray-600">
              Hide from public
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="isSold"
              name="isSold"
              checked={formData.isSold}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="isSold" className="text-gray-600">
              Mark as Sold
            </label>
          </div>
        </div>

        {/* Submit */}
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
