import React, { useEffect, useState } from "react";
import { handleSuccess, handleError } from "../utils";
import PrimaryButton from "./PrimaryButton";
import AdminBackButton from "./AdminBackButton";

const API_URL = "http://localhost:5050/asanas";

const stringToArray = (str) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const AdminAsanas = () => {
  const [asanas, setAsanas] = useState([]);
  const [newAsana, setNewAsana] = useState({
    name: "",
    bodyParts: "",
    benefits: "",
    steps: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editAsana, setEditAsana] = useState({
    name: "",
    bodyParts: "",
    benefits: "",
    steps: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [asanaToDelete, setAsanaToDelete] = useState(null);

  const fetchAsanas = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAsanas(data.asanas || []);
    } catch {
      handleError("Failed to fetch asanas");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAsanas();
  }, []);

  const handleAddAsana = async (e) => {
    e.preventDefault();
    try {
      const formattedAsana = {
        ...newAsana,
        bodyParts: stringToArray(newAsana.bodyParts),
        benefits: stringToArray(newAsana.benefits),
        steps: stringToArray(newAsana.steps),
      };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formattedAsana),
      });
      const data = await response.json();
      if (data.success) {
        handleSuccess("Asana added successfully");
        setNewAsana({
          name: "",
          bodyParts: "",
          benefits: "",
          steps: "",
          image: "",
        });
        fetchAsanas();
      } else {
        handleError(data.message || "Failed to add asana");
      }
    } catch {
      handleError("Failed to add asana");
    }
  };

  const openDeleteModal = (asanaId) => {
    setAsanaToDelete(asanaId);
    setShowModal(true);
  };

  const confirmDeleteAsana = async () => {
    try {
      const response = await fetch(`${API_URL}/${asanaToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAsanas(asanas.filter((a) => a._id !== asanaToDelete));
      } else {
        handleError(data.message || "Failed to delete asana");
      }
    } catch {
      handleError("Failed to delete asana");
    }
    setShowModal(false);
    setAsanaToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setAsanaToDelete(null);
  };

  const startEdit = (asana) => {
    setEditingId(asana._id);
    setEditAsana({
      name: asana.name,
      bodyParts: asana.bodyParts.join(", "),
      benefits: asana.benefits.join(", "),
      steps: asana.steps.join(", "),
      image: asana.image,
    });
  };

  const handleEditChange = (e) => {
    setEditAsana({ ...editAsana, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedAsana = {
        ...editAsana,
        bodyParts: stringToArray(editAsana.bodyParts),
        benefits: stringToArray(editAsana.benefits),
        steps: stringToArray(editAsana.steps),
      };
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formattedAsana),
      });
      const data = await response.json();
      if (data.success) {
        handleSuccess("Asana updated successfully");
        setEditingId(null);
        fetchAsanas();
      } else {
        handleError(data.message || "Failed to update asana");
      }
    } catch {
      handleError("Failed to update asana");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#16a34a] to-[#0ea5e9] py-10 px-2">
      <div className="max-w-7xl mx-auto p-6 bg-[#232136] rounded-2xl shadow-2xl border border-green-400/30">
        <AdminBackButton />
        <h2 className="text-3xl font-bold mb-8 text-center text-green-300 tracking-wide drop-shadow-lg">
          🧘 Asana Management
        </h2>
        <form onSubmit={handleAddAsana} className="mb-6 space-y-2">
          <input
            className="input w-full bg-[#18181b] border border-green-700 text-green-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            name="name"
            placeholder="Name"
            value={newAsana.name}
            onChange={(e) => setNewAsana({ ...newAsana, name: e.target.value })}
            required
          />
          <input
            className="input w-full bg-[#18181b] border border-green-700 text-green-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            name="bodyParts"
            placeholder="Body Parts (comma separated)"
            value={newAsana.bodyParts}
            onChange={(e) =>
              setNewAsana({ ...newAsana, bodyParts: e.target.value })
            }
            required
          />
          <input
            className="input w-full bg-[#18181b] border border-green-700 text-green-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            name="benefits"
            placeholder="Benefits (comma separated)"
            value={newAsana.benefits}
            onChange={(e) =>
              setNewAsana({ ...newAsana, benefits: e.target.value })
            }
            required
          />
          <input
            className="input w-full bg-[#18181b] border border-green-700 text-green-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            name="steps"
            placeholder="Steps (comma separated)"
            value={newAsana.steps}
            onChange={(e) =>
              setNewAsana({ ...newAsana, steps: e.target.value })
            }
            required
          />
          <input
            className="input w-full bg-[#18181b] border border-green-700 text-green-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
            name="image"
            placeholder="Image URL"
            value={newAsana.image}
            onChange={(e) =>
              setNewAsana({ ...newAsana, image: e.target.value })
            }
          />
          <PrimaryButton type="submit">Add Asana</PrimaryButton>
        </form>

        {loading ? (
          <div className="text-center text-green-200 animate-pulse">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full bg-[#232136] border border-green-900 rounded-lg shadow-sm text-white">
              <thead>
                <tr className="bg-green-900 text-green-200 text-lg">
                  <th className="px-5 py-3 border-b text-left">Name</th>
                  <th className="px-5 py-3 border-b text-left">Body Parts</th>
                  <th className="px-5 py-3 border-b text-left">Benefits</th>
                  <th className="px-5 py-3 border-b text-left">Steps</th>
                  <th className="px-5 py-3 border-b text-left">Image</th>
                  <th className="px-5 py-3 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {asanas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-green-400">
                      No asanas found.
                    </td>
                  </tr>
                ) : (
                  asanas.map((asana) =>
                    editingId === asana._id ? (
                      <tr key={asana._id} className="bg-[#18181b]">
                        <td colSpan={6}>
                          <form
                            onSubmit={handleEditSubmit}
                            className="flex flex-col md:flex-row gap-2 items-center"
                          >
                            <input
                              className="input bg-[#232136] border border-green-700 text-green-100 rounded-lg px-2 py-1"
                              name="name"
                              value={editAsana.name}
                              onChange={handleEditChange}
                              required
                            />
                            <input
                              className="input bg-[#232136] border border-green-700 text-green-100 rounded-lg px-2 py-1"
                              name="bodyParts"
                              value={editAsana.bodyParts}
                              onChange={handleEditChange}
                              required
                            />
                            <input
                              className="input bg-[#232136] border border-green-700 text-green-100 rounded-lg px-2 py-1"
                              name="benefits"
                              value={editAsana.benefits}
                              onChange={handleEditChange}
                              required
                            />
                            <input
                              className="input bg-[#232136] border border-green-700 text-green-100 rounded-lg px-2 py-1"
                              name="steps"
                              value={editAsana.steps}
                              onChange={handleEditChange}
                              required
                            />
                            <input
                              className="input bg-[#232136] border border-green-700 text-green-100 rounded-lg px-2 py-1"
                              name="image"
                              value={editAsana.image}
                              onChange={handleEditChange}
                            />
                            <div className="flex gap-2">
                              <PrimaryButton type="submit">Save</PrimaryButton>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditingId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </td>
                      </tr>
                    ) : (
                      <tr key={asana._id} className="hover:bg-green-950 transition-all">
                        <td className="px-5 py-3 border-b">{asana.name}</td>
                        <td className="px-5 py-3 border-b">
                          {Array.isArray(asana.bodyParts)
                            ? asana.bodyParts.join(", ")
                            : asana.bodyParts}
                        </td>
                        <td className="px-5 py-3 border-b">
                          {Array.isArray(asana.benefits)
                            ? asana.benefits.join(", ")
                            : asana.benefits}
                        </td>
                        <td className="px-5 py-3 border-b">
                          {Array.isArray(asana.steps)
                            ? asana.steps.join(", ")
                            : asana.steps}
                        </td>
                        <td className="px-5 py-3 border-b">
                          {asana.image ? (
                            <img
                              src={asana.image}
                              alt={asana.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <span className="text-green-400">No image</span>
                          )}
                        </td>
                        <td className="px-5 py-3 border-b">
                          <PrimaryButton onClick={() => startEdit(asana)}>
                            Edit
                          </PrimaryButton>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition font-semibold ml-2"
                            onClick={() => openDeleteModal(asana._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="bg-[#232136] rounded-xl shadow-xl p-8 w-full max-w-sm border border-green-900">
              <h3 className="text-lg font-semibold mb-4 text-green-200">
                Confirm Delete
              </h3>
              <p className="mb-6 text-green-300">
                Are you sure you want to delete this asana?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded bg-green-900 hover:bg-green-800 text-green-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAsana}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAsanas;