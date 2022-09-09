import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Dashboard from "../components/Dashboard/Dashboard";

// context
import UserContext from "../context/UserContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!user._id) {
      navigate("/login");
    }
  }, [user._id, navigate]);
  return (
    <div className="min-h-[100vh]">{user._id && <Dashboard user={user} />}</div>
  );
}

export default Home;
