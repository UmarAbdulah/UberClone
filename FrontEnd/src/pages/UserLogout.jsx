import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/user-login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        navigate("/user-login");
      });
  }, []);

  return <div>User Logout</div>;
};

export default UserLogout;
