import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const Modal = ({ show, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    role: "",
    phone: "",
    website: "",
    company: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        role: user.role || "",
        phone: user.phone || "",
        website: user.website || "",
        company: user.company || "",
        address: user.address || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        username: "",
        role: "",
        phone: "",
        website: "",
        company: "",
        address: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Cross icon for closing the modal */}
        <button className="close-btn" onClick={onClose}>
          &#10005; {/* Unicode character for cross (×) */}
        </button>

        <h2>{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <div className="modal-actions">
            <button type="submit">{user ? "Save Changes" : "Add User"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
