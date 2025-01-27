import React from "react";
import '../styles/UserDetail.css';
const UserDetail = ({ user }) => {
  return (
    <div className="user-detail">
      <h2>{user.name}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
    </div>
  );
};

export default UserDetail;
