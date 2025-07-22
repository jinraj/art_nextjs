'use client';

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";


// Dummy data for demonstration
const initialArtworks = [
  {
    id: 1,
    type: 'Paintings',
    title: 'Sunset',
    description: 'A beautiful sunset painting.',
    images: ['sunset.jpg'],
    size: '24x36',
    price: 1200,
    createdAt: new Date('2024-07-01T10:00:00'),
    updatedAt: new Date('2024-07-10T12:00:00'),
  },
  {
    id: 2,
    type: 'Photography',
    title: 'Mountain View',
    description: 'Stunning mountain landscape.',
    images: ['mountain.jpg'],
    size: '18x24',
    price: 800,
    createdAt: new Date('2024-07-05T09:30:00'),
    updatedAt: new Date('2024-07-11T14:20:00'),
  },
];

const types = ['Paintings', 'Photography', 'Decors', 'Artifacts'];

const ListofArtworks = () => {
  const [artworks, setArtworks] = useState(initialArtworks);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);

  const handleDelete = (id: number) => {
    setArtworks(artworks.filter(a => a.id !== id));
  };

  const handleEdit = (artwork: any) => {
    setEditId(artwork.id);
    setEditData({ ...artwork });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setArtworks(artworks.map(a =>
      a.id === editId
        ? {
          ...editData,
          id: editId,
          updatedAt: new Date(),
        }
        : a
    ));
    setEditId(null);
    setEditData(null);
  };

  return (
    <div className="pt-25 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">All Artworks</h2>
      <div className="overflow-visible">
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Id</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Images</th>
              <th className="px-4 py-2 text-left">Size (in)</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Modified</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map(artwork =>
              editId === artwork.id ? (
                <tr key={artwork.id} className="bg-gray-100">
                  <td className=" px-2 py-1">
                    {artwork.id}
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      name="title"
                      type="text"
                      value={editData.title}
                      onChange={handleEditChange}
                      className="w-full  rounded px-2 py-1"
                      required
                    />
                  </td>
                  <td className=" px-2 py-1">
                    <select
                      name="type"
                      value={editData.type}
                      onChange={handleEditChange}
                      className="w-full  rounded px-2 py-1"
                      required
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </td>
                  <td className=" px-2 py-1">
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      className="w-full  rounded px-2 py-1"
                      rows={2}
                      required
                    />
                  </td>
                  <td className=" px-2 py-1">
                    {editData.images.map((img: string, idx: number) => (
                      <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded mr-1">{img}</span>
                    ))}
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      name="size"
                      type="text"
                      value={editData.size}
                      onChange={handleEditChange}
                      className="w-full  rounded px-2 py-1"
                      required
                    />
                  </td>
                  <td className=" px-2 py-1">
                    <input
                      name="price"
                      type="number"
                      value={editData.price}
                      onChange={handleEditChange}
                      className="w-full  rounded px-2 py-1"
                      required
                    />
                  </td>
                  <td className=" px-2 py-1">
                    {artwork.createdAt.toLocaleString()}
                  </td>
                  <td className=" px-2 py-1">
                    {new Date().toLocaleString()}
                  </td>
                  <td className=" px-2 py-1">
                    <button title="Cancel" className=" text-gray-400 hover:text-gray-700 mr-2" onClick={() => setEditId(null)}><FaTimes size={18} /></button>
                    <button title="Save" className=" text-green-500 hover:text-green-700 px-2 py-1 rounded" onClick={handleEditSubmit}><FaSave size={18} /></button>
                  </td>
                </tr>
              ) : (
                <tr key={artwork.id}>
                  <td className=" px-2 py-1">{artwork.id}</td>
                  <td className=" px-2 py-1">{artwork.title}</td>
                  <td className=" px-2 py-1">{artwork.type}</td>
                  <td className=" px-2 py-1">{artwork.description}</td>
                  <td className=" px-2 py-1">
                    {artwork.images.map((img, idx) => (
                      <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded mr-1">{img}</span>
                    ))}
                  </td>
                  <td className=" px-2 py-1">{artwork.size}</td>
                  <td className=" px-2 py-1">₹{artwork.price}</td>
                  <td className=" px-2 py-1">{artwork.createdAt.toLocaleString()}</td>
                  <td className=" px-2 py-1">{artwork.updatedAt.toLocaleString()}</td>
                  <td className="px-2 py-1">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      title="Edit"
                      onClick={() => handleEdit(artwork)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                      onClick={() => handleDelete(artwork.id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListofArtworks;