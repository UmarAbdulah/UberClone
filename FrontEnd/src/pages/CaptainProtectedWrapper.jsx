import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/captain-context";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { captain, updateCaptain } = useContext(CaptainContext);

  useEffect(() => {
    // If no token, redirect immediately
    if (!token) {
      navigate("/captain-login");
      return;
    }

    // Fetch captain profile once
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          updateCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token, navigate, updateCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default CaptainProtectedWrapper;
