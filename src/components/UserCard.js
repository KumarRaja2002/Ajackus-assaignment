import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons from react-icons
import "../styles/UserCard.css";

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <div className="user-actions">
        <Link to={`/user/${user.id}`} className="view-btn">
          <FaEye /> {/* Eye icon for "View" */}
        </Link>
        <button onClick={() => onEdit(user)} className="edit-btn">
          <FaEdit /> {/* Edit icon */}
        </button>
        <button onClick={() => onDelete(user.id)} className="delete-btn">
          <FaTrashAlt /> {/* Trash icon for "Delete" */}
        </button>
      </div>

    </div>
  );
};

export default UserCard;
