import React, { createContext, useEffect } from "react";
import { io } from "socket.io-client";

// Create context
export const SocketContext = createContext();

// Correct the env var syntax
const socket = io(import.meta.env.VITE_BASE_URL, {
  autoConnect: false,
  transports: ["websocket"],
});

const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.connect(); // manually connect
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  const receiveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
