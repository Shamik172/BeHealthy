import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5050/users";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch {
      // Handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        setNewUser({ name: "", email: "" });
        fetchUsers();
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch {
      alert("Failed to add user");
    }
  };

  // Open modal
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  // Confirm delete
  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`${API_URL}/${userToDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== userToDelete._id));
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch {
      alert("Failed to delete user");
    }
    setShowModal(false);
    setUserToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#312e81] to-[#0ea5e9] py-10 px-2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-[#232136] rounded-2xl shadow-2xl border border-[#6366f1]/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400 tracking-wide drop-shadow-lg">
          👥 User Management
        </h2>
        <form
          onSubmit={handleAddUser}
          className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-center"
        >
          <motion.input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="input w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-700 bg-[#18181b] text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-700 bg-[#18181b] text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition"
          >
            ➕ Add User
          </motion.button>
        </form>
        {loading ? (
          <div className="text-center text-blue-200 animate-pulse">Loading...</div>
        ) : (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <table className="min-w-full bg-[#232136] border border-blue-900 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-blue-900 text-blue-200 text-lg">
                  <th className="px-5 py-3 border-b text-left">Name</th>
                  <th className="px-5 py-3 border-b text-left">Email</th>
                  <th className="px-5 py-3 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-blue-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      className="hover:bg-blue-950 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-5 py-3 border-b">{user.name}</td>
                      <td className="px-5 py-3 border-b">{user.email}</td>
                      <td className="px-5 py-3 border-b">
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-[#232136] rounded-xl shadow-xl p-8 w-full max-w-sm border border-blue-900">
              <h3 className="text-lg font-semibold mb-4 text-blue-200">
                Confirm Delete
              </h3>
              <p className="mb-6 text-blue-300">
                Are you sure you want to delete <span className="font-bold">{userToDelete?.name}</span>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded bg-blue-900 hover:bg-blue-800 text-blue-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteUser}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminUsers;
