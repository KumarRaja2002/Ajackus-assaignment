import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../api/userApi";
import UserDetail from "../components/UserDetail";
import "../styles/UserDetailPage.css";
import img from '../images/glitch-error-404-page_23-2148105404.avif';
const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const users = await getUsers();
        const foundUser = users.find((user) => user.id === parseInt(id));
        setUser(foundUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetail();
  }, [id]);

  return (
    <div className="user-detail-page">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading user details...</p>
        </div>
      ) : user ? (
        <UserDetail user={user} />
      ) : (
        <img src={img} alt="User not found" />
      )}
    </div>
  );
};

export default UserDetailPage;
