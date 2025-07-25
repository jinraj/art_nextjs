'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { artTypes } from '@/app/constants/meta';

const ListofArtworks = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const cellClass = "border border-gray-200 px-2 py-2";

  // 🔄 Fetch artworks on mount
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch('/api/artwork');
        if (!res.ok) throw new Error('Failed to fetch artworks');
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        console.error(err);
        alert('Error fetching artworks');
      }
    };
    fetchArtworks();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/artwork`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");

      setArtworks(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      alert("Error deleting artwork");
    }
  };

  const handleEdit = (artwork: any) => {
    setEditId(artwork.id);
    setEditData({ ...artwork });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    const parsedValue = type === 'checkbox' ? checked : value;
    setEditData((prev: any) => ({ ...prev, [name]: parsedValue }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/artwork`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      setArtworks(artworks.map(a =>
        a.id === editId
          ? { ...editData, updatedAt: new Date() }
          : a
      ));
      setEditId(null);
      setEditData(null);
      alert("Update successful");
    } catch (err) {
      alert("Failed to update artwork");
    }
  };

  return (
    <div className="pt-25 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">All Artworks</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow rounded-xl text-sm border border-gray-300">
          <thead>
            <tr>
              {[
                "Sl.No.", "Title", "Art Type", "Description", "Images", "Dimension (in)",
                "Medium", "Price", "isHidden", "isSold", "Created", "Modified", "Actions"
              ].map((head) => (
                <th key={head} className="border border-gray-200 px-2 py-2 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork, i) =>
              editId === artwork.id ? (
                <tr key={artwork.id} className="bg-gray-100">
                  <td className={cellClass}>{artwork.id}</td>
                  <td className={cellClass}><input name="title" value={editData.title} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td className={cellClass}>
                    <select name="artType" value={editData.artType} onChange={handleEditChange} className="rounded px-1 py-1 w-full">
                      {artTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </td>
                  <td className={cellClass}><textarea name="description" value={editData.description} onChange={handleEditChange} rows={2} className="rounded px-1 py-1 w-full" /></td>
                  <td className={cellClass}>
                    {editData.images?.map((img: string, i: number) => (
                      <span key={i} className="inline-block bg-gray-200 px-2 py-1 rounded mr-1">{img}</span>
                    ))}
                  </td>
                  <td className={cellClass}><input name="dimension" value={editData.dimension} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td className={cellClass}><input name="medium" value={editData.medium} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td className={cellClass}><input name="price" type="number" value={editData.price} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td className={cellClass}><input name="isHidden" type="checkbox" checked={editData.isHidden} onChange={handleEditChange} /></td>
                  <td className={cellClass}><input name="isSold" type="checkbox" checked={editData.isSold} onChange={handleEditChange} /></td>
                  <td className={cellClass}>{new Date(artwork.createdAt).toLocaleString()}</td>
                  <td className={cellClass}>{new Date().toLocaleString()}</td>
                  <td className={cellClass}>
                    <button className="text-gray-400 hover:text-gray-700 mr-2" title="Cancel" onClick={() => setEditId(null)}><FaTimes /></button>
                    <button className="text-green-500 hover:text-green-700" title="Save" onClick={handleEditSubmit}><FaSave /></button>
                  </td>
                </tr>
              ) : (
                <tr key={artwork.id} className='border border-gray-300'>
                  <td className={cellClass}>{i + 1}</td>
                  <td className={cellClass}>{artwork.title}</td>
                  <td className={cellClass}>{artwork.artType}</td>
                  <td className={cellClass}>{artwork.description}</td>
                  <td className={cellClass}>{artwork.images?.map((img: string, i: number) => (
                    <span key={i} className="inline-block bg-gray-200 px-2 py-1 rounded mr-1 mb-2">{img}</span>
                  ))}</td>
                  <td className={cellClass}>{artwork.dimension}</td>
                  <td className={cellClass}>{artwork.medium}</td>
                  <td className={cellClass}>₹{artwork.price}</td>
                  <td className={cellClass}>{artwork.isHidden ? 'Yes' : 'No'}</td>
                  <td className={cellClass}>{artwork.isSold ? 'Yes' : 'No'}</td>
                  <td className={cellClass}>{new Date(artwork.createdAt).toLocaleString()}</td>
                  <td className={cellClass}>{new Date(artwork.updatedAt).toLocaleString()}</td>
                  <td className={cellClass}>
                    <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEdit(artwork)} title="Edit"><FaEdit /></button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(artwork.id)} title="Delete"><FaTrash /></button>
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
