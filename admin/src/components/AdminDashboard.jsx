import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaDumbbell, FaCog } from "react-icons/fa";  // React icons

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      {/* Dashboard Cards */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition group">
            <FaUsers className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Users Management</h2>
            <p className="text-gray-600 mb-4">View and manage registered users.</p>
            <Link
              to="/admin/users"
              className="text-green-600 hover:underline font-medium"
            >
              Go to Users →
            </Link>
          </div>

          {/* Asanas Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition group">
            <FaDumbbell className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Asanas Management</h2>
            <p className="text-gray-600 mb-4">Add, edit, or remove yoga asanas.</p>
            <Link
              to="/admin/asanas"
              className="text-green-600 hover:underline font-medium"
            >
              Go to Asanas →
            </Link>
          </div>

          {/* Settings Card */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition group">
            <FaCog className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-600 mb-4">Update admin preferences and site settings.</p>
            <Link
              to="/admin/settings"
              className="text-green-600 hover:underline font-medium"
            >
              Go to Settings →
            </Link>
          </div>
        </div>
      </div>

      {/* Test Button */}
      <div className="mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
