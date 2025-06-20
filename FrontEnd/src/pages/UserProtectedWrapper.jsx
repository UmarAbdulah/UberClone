import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default UserProtectedWrapper;
