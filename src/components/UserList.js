import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, addUser, updateUser } from "../api/userApi";
import UserCard from "./UserCard";
import Modal from "./Modal";
import { FaPlus, FaSun, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For route navigation
import "../styles/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sortOption, setSortOption] = useState("none");

  const navigate = useNavigate();

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
    document.body.classList.toggle("dark-mode", savedTheme);
  }, []);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const sortUsers = (users) => {
    switch (sortOption) {
      case "a-z":
        return [...users].sort((a, b) => a.name.localeCompare(b.name));
      case "z-a":
        return [...users].sort((a, b) => b.name.localeCompare(a.name));
      case "none":
      default:
        return [...users].sort((a, b) => b.id - a.id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setMessage("User deleted successfully.");
      setMessageType("success");
      hideMessage();
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete user.");
      setMessageType("error");
      hideMessage();
    }
  };

  const handleView = (id) => {
    navigate(`/user/${id}`); // Navigate to the user view route
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowModal(true);
  };

  const handleAddUser = () => {
    setUserToEdit(null);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      let response;
      if (userToEdit) {
        response = await updateUser(userToEdit.id, formData);
        setMessage("User updated successfully.");
        setMessageType("success");
      } else {
        response = await addUser(formData);
        setMessage("User added successfully.");
        setMessageType("success");
      }

      setUsers((prevUsers) =>
        userToEdit
          ? prevUsers.map((user) =>
              user.id === userToEdit.id ? { ...user, ...formData } : user
            )
          : [...prevUsers, response]
      );

      setShowModal(false);
      hideMessage();
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit the user.");
      setMessageType("error");
      hideMessage();
    }
  };

  const hideMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.body.classList.toggle("dark-mode", newTheme);
    localStorage.setItem("darkMode", newTheme); // Persist theme in localStorage
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedUsers = sortUsers(filteredUsers);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className={`user-list ${isDarkMode ? "dark-mode" : ""}`}>
      {/* Header Section */}
      <div className="header-container">
        <div className="sorting-container">
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="none">None</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
        <h1>Welcome to User Dashboard</h1>
        <button className="toggle-btn" onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleAddUser} className="add-user-btn">
          <FaPlus /> Add User
        </button>
      </div>

      {/* Success/Failure Message */}
      {message && <div className={`message-popup ${messageType}`}>{message}</div>}

      {/* User Cards */}
      <div className="user-cards">
        {currentUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
            onView={handleView}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {[...Array(Math.ceil(filteredUsers.length / usersPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal for Adding/Editing User */}
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          user={userToEdit}
        />
      )}
    </div>
  );
};

export default UserList;
