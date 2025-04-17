import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Management Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Users Management</h2>
            <Link to="/admin/users" className="text-green-600 hover:text-green-700">
              Manage Users →
            </Link>
          </div>

          {/* Asanas Management Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Asanas Management</h2>
            <Link to="/admin/asanas" className="text-green-600 hover:text-green-700">
              Manage Asanas →
            </Link>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
            <Link to="/admin/settings" className="text-green-600 hover:text-green-700">
              Manage Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;