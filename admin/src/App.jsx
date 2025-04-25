import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapComponent from './components/MapComponent';
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import AdminAsanas from "./components/AdminAsanas";
import AdminSettings from "./components/AdminSettings";
import AdminRoute from "./components/AdminRoute";
import AuthPage from './components/auth/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <div className="p-4 min-h-screen bg-gray-100">
            <h1 className="text-xl font-bold mb-4 text-center">Map Example</h1>
            <MapComponent />
          </div>
        } />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/asanas"
          element={
            <AdminRoute>
              <AdminAsanas />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/auth"
          element={
            <AdminRoute>
              <AuthPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
