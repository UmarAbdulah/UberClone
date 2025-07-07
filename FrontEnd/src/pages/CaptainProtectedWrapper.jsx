import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/captain-context";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, updateCaptain } = useContext(CaptainContext);

  useEffect(() => {
    // Redirect if no token
    if (!token) {
      navigate("/captain-login");
    }
  }, [token, navigate]);

  return token ? children : <div>Loading...</div>;
};

export default CaptainProtectedWrapper;
