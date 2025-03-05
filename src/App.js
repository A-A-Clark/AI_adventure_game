import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CharacterSetup from "./components/CharacterSetup";
import Game from "./components/Game";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Layout from "./components/Layout";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/game" />}
      />
      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/game" />}
      />

      {/* Protected routes */}
      <Route path="/" element={token ? <Layout /> : <Navigate to="/login" />}>
        <Route path="setup" element={<CharacterSetup />} />
        <Route index element={<Game />} />
        <Route path="game" element={<Game />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
