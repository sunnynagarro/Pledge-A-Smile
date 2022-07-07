import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";

// provider
import { UserProvider } from "./context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

// configs
import { GOOGLE_CLIENT_ID } from "./config";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/reset/:resetPasswordToken"
                element={<ResetPassword />}
              />
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
