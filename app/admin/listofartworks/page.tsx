'use client';

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const artTypes = ['Paintings', 'Photography', 'Decors', 'Artifacts'];

const ListofArtworks = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);

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
    } catch (err) {
      alert("Failed to update artwork");
    }
  };

  return (
    <div className="pt-25 min-h-screen p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">All Artworks</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white shadow rounded-xl text-sm">
          <thead>
            <tr>
              {[
                "Id", "Title", "Art Type", "Description", "Images", "Dimension (in)",
                "Medium", "Price", "isHidden", "isSold", "Created", "Modified", "Actions"
              ].map((head) => (
                <th key={head} className="px-4 py-2 text-left">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {artworks.map((artwork) =>
              editId === artwork.id ? (
                <tr key={artwork.id} className="bg-gray-100">
                  <td>{artwork.id}</td>
                  <td><input name="title" value={editData.title} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td>
                    <select name="artType" value={editData.artType} onChange={handleEditChange} className="rounded px-1 py-1 w-full">
                      {artTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </td>
                  <td><textarea name="description" value={editData.description} onChange={handleEditChange} rows={2} className="rounded px-1 py-1 w-full" /></td>
                  <td>
                    {editData.images?.map((img: string, i: number) => (
                      <span key={i} className="inline-block bg-gray-200 px-2 py-1 rounded mr-1">{img}</span>
                    ))}
                  </td>
                  <td><input name="dimension" value={editData.dimension} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td><input name="medium" value={editData.medium} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td><input name="price" type="number" value={editData.price} onChange={handleEditChange} className="rounded px-1 py-1 w-full" /></td>
                  <td><input name="isHidden" type="checkbox" checked={editData.isHidden} onChange={handleEditChange} /></td>
                  <td><input name="isSold" type="checkbox" checked={editData.isSold} onChange={handleEditChange} /></td>
                  <td>{new Date(artwork.createdAt).toLocaleString()}</td>
                  <td>{new Date().toLocaleString()}</td>
                  <td>
                    <button className="text-gray-400 hover:text-gray-700 mr-2" title="Cancel" onClick={() => setEditId(null)}><FaTimes /></button>
                    <button className="text-green-500 hover:text-green-700" title="Save" onClick={handleEditSubmit}><FaSave /></button>
                  </td>
                </tr>
              ) : (
                <tr key={artwork.id}>
                  <td>{artwork.id}</td>
                  <td>{artwork.title}</td>
                  <td>{artwork.artType}</td>
                  <td>{artwork.description}</td>
                  <td>{artwork.images?.map((img: string, i: number) => (
                    <span key={i} className="inline-block bg-gray-200 px-2 py-1 rounded mr-1">{img}</span>
                  ))}</td>
                  <td>{artwork.dimension}</td>
                  <td>{artwork.medium}</td>
                  <td>₹{artwork.price}</td>
                  <td>{artwork.isHidden ? 'Yes' : 'No'}</td>
                  <td>{artwork.isSold ? 'Yes' : 'No'}</td>
                  <td>{new Date(artwork.createdAt).toLocaleString()}</td>
                  <td>{new Date(artwork.updatedAt).toLocaleString()}</td>
                  <td>
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
