import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user-context.jsx";
import CaptainContextProvider from "./context/captain-context.jsx";
import SocketProvider from "./context/SocketContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContextProvider>
      <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </UserProvider>
    </CaptainContextProvider>
  </StrictMode>
);
