import React, { createContext, useState, useContext } from "react";

export const CaptainContext = createContext();

export const CaptainContextProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);

  const updateCaptain = (newCaptain) => {
    setCaptain(newCaptain);
  };

  return (
    <CaptainContext.Provider value={{ captain, updateCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
};

export default CaptainContextProvider;
