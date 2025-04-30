import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapComponent from './components/MapComponent';
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import AdminAsanas from "./components/AdminAsanas";
import AdminSettings from "./components/AdminSettings";
import AdminNotifications from "./components/AdminNotifications";

import AdminLogin from './components/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/admin/login" 
          element={<AdminLogin />} 
        />

        <Route 
          path="/" 
          element={
            <div className="p-4 min-h-screen bg-gray-100">
              <h1 className="text-xl font-bold mb-4 text-center">Map Example</h1>
              <MapComponent />
            </div>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin"
          element={<AdminDashboard />} 
        />

        <Route 
          path="/admin/users"
          element={<AdminUsers />} 
        />

        <Route 
          path="/admin/asanas"
          element={<AdminAsanas />} 
        />

        <Route 
          path="/admin/settings"
          element={<AdminSettings />} 
        />

        <Route
          path="/admin/notifications"
          element={<AdminNotifications />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
