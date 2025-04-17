import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from "../../utils";

function AdminAsanas() {
  const [asanas, setAsanas] = useState([]);
  const [newAsana, setNewAsana] = useState({
    name: '',
    bodyParts: [],
    difficulty: '',
    duration: '',
    benefits: [],
    steps: [],
    image: '',
    video: ''
  });

  // Convert comma-separated string to array
  const stringToArray = (str) => str.split(',').map(item => item.trim());

  const fetchAsanas = async () => {
    try {
      const response = await fetch('http://localhost:5050/asanas');
      const data = await response.json();
      if (data.success) {
        setAsanas(data.asanas);
      }
    } catch (error) {
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
          name: '',
          bodyParts: [],
          difficulty: '',
          duration: '',
          benefits: [],
          steps: [],
          image: '',
          video: ''
        });
        fetchAsanas();
      }
    } catch (error) {
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
      } catch (error) {
        handleError('Failed to delete asana');
      }
    }
  };

  useEffect(() => {
    fetchAsanas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Asanas Management</h1>
          <Link to="/admin" className="text-green-600 hover:text-green-700">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Add New Asana Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Asana</h2>
          <form onSubmit={handleAddAsana} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Asana Name"
                className="p-2 border rounded"
                value={newAsana.name}
                onChange={(e) => setNewAsana({...newAsana, name: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Body Parts (comma-separated)"
                className="p-2 border rounded"
                value={newAsana.bodyParts}
                onChange={(e) => setNewAsana({...newAsana, bodyParts: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Difficulty"
                className="p-2 border rounded"
                value={newAsana.difficulty}
                onChange={(e) => setNewAsana({...newAsana, difficulty: e.target.value})}
              />
              <input
                type="text"
                placeholder="Duration"
                className="p-2 border rounded"
                value={newAsana.duration}
                onChange={(e) => setNewAsana({...newAsana, duration: e.target.value})}
              />
              <input
                type="text"
                placeholder="Benefits (comma-separated)"
                className="p-2 border rounded"
                value={newAsana.benefits}
                onChange={(e) => setNewAsana({...newAsana, benefits: e.target.value})}
              />
              <input
                type="text"
                placeholder="Image URL"
                className="p-2 border rounded"
                value={newAsana.image}
                onChange={(e) => setNewAsana({...newAsana, image: e.target.value})}
              />
              <input
                type="text"
                placeholder="Video URL"
                className="p-2 border rounded"
                value={newAsana.video}
                onChange={(e) => setNewAsana({...newAsana, video: e.target.value})}
              />
              <textarea
                placeholder="Steps (comma-separated)"
                className="p-2 border rounded md:col-span-2"
                value={newAsana.steps}
                onChange={(e) => setNewAsana({...newAsana, steps: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Asana
            </button>
          </form>
        </div>

        {/* Asanas List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Asanas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {asanas.map((asana) => (
              <div key={asana._id} className="border rounded-lg p-4">
                <img
                  src={asana.image}
                  alt={asana.name}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{asana.name}</h3>
                <p className="text-sm text-gray-600">Difficulty: {asana.difficulty}</p>
                <p className="text-sm text-gray-600">Duration: {asana.duration}</p>
                <div className="mt-2">
                  <h4 className="font-semibold text-sm">Body Parts:</h4>
                  <p className="text-sm text-gray-600">{asana.bodyParts.join(', ')}</p>
                </div>
                <button
                  onClick={() => handleDelete(asana._id)}
                  className="mt-4 text-red-600 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAsanas;