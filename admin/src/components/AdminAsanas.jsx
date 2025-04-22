// ...existing imports...
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

  const fetchAsanas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAsanas(data.asanas || []);
    } catch {
      handleError("Failed to fetch asanas");
    }
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

  // --- FIXED DELETE FUNCTION ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this asana?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        handleSuccess("Asana deleted successfully");
        setAsanas(asanas.filter((a) => a._id !== id));
      } else {
        handleError(data.message || "Failed to delete asana");
      }
    } catch {
      handleError("Failed to delete asana");
    }
  };

  // --- EDIT HANDLERS ---
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
    <div className="p-4">
      <AdminBackButton />
      <h2 className="text-2xl font-bold mb-4">Manage Asanas</h2>
      <form onSubmit={handleAddAsana} className="mb-6 space-y-2">
        <input
          className="input"
          name="name"
          placeholder="Name"
          value={newAsana.name}
          onChange={(e) => setNewAsana({ ...newAsana, name: e.target.value })}
          required
        />
        <input
          className="input"
          name="bodyParts"
          placeholder="Body Parts (comma separated)"
          value={newAsana.bodyParts}
          onChange={(e) =>
            setNewAsana({ ...newAsana, bodyParts: e.target.value })
          }
          required
        />
        <input
          className="input"
          name="benefits"
          placeholder="Benefits (comma separated)"
          value={newAsana.benefits}
          onChange={(e) =>
            setNewAsana({ ...newAsana, benefits: e.target.value })
          }
          required
        />
        <input
          className="input"
          name="steps"
          placeholder="Steps (comma separated)"
          value={newAsana.steps}
          onChange={(e) =>
            setNewAsana({ ...newAsana, steps: e.target.value })
          }
          required
        />
        <input
          className="input"
          name="image"
          placeholder="Image URL"
          value={newAsana.image}
          onChange={(e) =>
            setNewAsana({ ...newAsana, image: e.target.value })
          }
        />
        <PrimaryButton type="submit">Add Asana</PrimaryButton>
      </form>

      <div className="grid gap-4">
        {asanas.map((asana) =>
          editingId === asana._id ? (
            <form
              key={asana._id}
              onSubmit={handleEditSubmit}
              className="border p-4 rounded bg-gray-50"
            >
              <input
                className="input mb-2"
                name="name"
                value={editAsana.name}
                onChange={handleEditChange}
                required
              />
              <input
                className="input mb-2"
                name="bodyParts"
                value={editAsana.bodyParts}
                onChange={handleEditChange}
                required
              />
              <input
                className="input mb-2"
                name="benefits"
                value={editAsana.benefits}
                onChange={handleEditChange}
                required
              />
              <input
                className="input mb-2"
                name="steps"
                value={editAsana.steps}
                onChange={handleEditChange}
                required
              />
              <input
                className="input mb-2"
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
          ) : (
            <div
              key={asana._id}
              className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between bg-white"
            >
              <div>
                <h3 className="font-bold">{asana.name}</h3>
                <p>
                  <span className="font-semibold">Body Parts:</span>{" "}
                  {asana.bodyParts.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Benefits:</span>{" "}
                  {asana.benefits.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Steps:</span>{" "}
                  {asana.steps.join(", ")}
                </p>
                {asana.image && (
                  <img
                    src={asana.image}
                    alt={asana.name}
                    className="w-32 h-20 object-cover mt-2 rounded"
                  />
                )}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <PrimaryButton onClick={() => startEdit(asana)}>
                  Edit
                </PrimaryButton>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(asana._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminAsanas;
// ...existing code...