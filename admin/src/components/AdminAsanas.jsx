// FILE: src/components/AdminAsanas.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import PrimaryButton from './PrimaryButton';

function AdminAsanas() {
  const [asanas, setAsanas] = useState([]);
  const [newAsana, setNewAsana] = useState({
    name: '',
    bodyParts: '',
    difficulty: '',
    duration: '',
    benefits: '',
    steps: '',
    image: '',
    video: ''
  });

  const stringToArray = (str) => str.split(',').map(item => item.trim());

  const fetchAsanas = async () => {
    try {
      const response = await fetch('http://localhost:5050/asanas');
      const data = await response.json();
      if (data.success) setAsanas(data.asanas);
    } catch {
      handleError('Failed to fetch asanas');
    }
  };

  const handleAddAsana = async (e) => {
    e.preventDefault();
    try {
      const formattedAsana = {
        ...newAsana,
        bodyParts: stringToArray(newAsana.bodyParts),
        benefits: stringToArray(newAsana.benefits),
        steps: stringToArray(newAsana.steps)
      };

      const response = await fetch('http://localhost:5050/asanas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formattedAsana)
      });
      const data = await response.json();
      if (data.success) {
        handleSuccess('Asana added successfully');
        setNewAsana({
          name: '', bodyParts: '', difficulty: '', duration: '',
          benefits: '', steps: '', image: '', video: ''
        });
        fetchAsanas();
      }
    } catch {
      handleError('Failed to add asana');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this asana?')) {
      try {
        const response = await fetch(`http://localhost:5050/asanas/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          handleSuccess('Asana deleted successfully');
          fetchAsanas();
        }
      } catch {
        handleError('Failed to delete asana');
      }
    }
  };

  useEffect(() => {
    fetchAsanas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-800">Asanas Management</h1>
          <Link to="/admin" className="text-green-600 hover:text-green-800 transition font-medium">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add Asana Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Asana</h2>
          <form onSubmit={handleAddAsana} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Asana Name" className="input" value={newAsana.name} onChange={(e) => setNewAsana({ ...newAsana, name: e.target.value })} required />
              <input type="text" placeholder="Body Parts (comma-separated)" className="input" value={newAsana.bodyParts} onChange={(e) => setNewAsana({ ...newAsana, bodyParts: e.target.value })} required />
              <input type="text" placeholder="Difficulty" className="input" value={newAsana.difficulty} onChange={(e) => setNewAsana({ ...newAsana, difficulty: e.target.value })} />
              <input type="text" placeholder="Duration" className="input" value={newAsana.duration} onChange={(e) => setNewAsana({ ...newAsana, duration: e.target.value })} />
              <input type="text" placeholder="Benefits (comma-separated)" className="input" value={newAsana.benefits} onChange={(e) => setNewAsana({ ...newAsana, benefits: e.target.value })} />
              <input type="text" placeholder="Image URL" className="input" value={newAsana.image} onChange={(e) => setNewAsana({ ...newAsana, image: e.target.value })} />
              <input type="text" placeholder="Video URL" className="input" value={newAsana.video} onChange={(e) => setNewAsana({ ...newAsana, video: e.target.value })} />
              <textarea placeholder="Steps (comma-separated)" className="textarea md:col-span-2" value={newAsana.steps} onChange={(e) => setNewAsana({ ...newAsana, steps: e.target.value })}></textarea>
            </div>
            <PrimaryButton type="submit">Add Asana</PrimaryButton>
          </form>
        </div>

        {/* Asanas List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Current Asanas</h2>
          {asanas.length === 0 ? (
            <p className="text-gray-500">No asanas available. Please add one above.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {asanas.map((asana) => (
                <div key={asana._id} className="bg-green-50 border border-green-100 rounded-xl p-5 hover:shadow-xl transition">
                  <img src={asana.image} alt={asana.name} className="w-full h-48 object-cover rounded-md mb-3" />
                  <h3 className="font-bold text-lg text-green-900">{asana.name}</h3>
                  <p className="text-sm text-gray-700 mt-1">Difficulty: {asana.difficulty}</p>
                  <p className="text-sm text-gray-700">Duration: {asana.duration}</p>
                  <div className="mt-2">
                    <h4 className="font-semibold text-sm text-green-800">Body Parts:</h4>
                    <p className="text-sm text-gray-600">{asana.bodyParts.join(', ')}</p>
                  </div>
                  <button onClick={() => handleDelete(asana._id)} className="mt-4 text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminAsanas;