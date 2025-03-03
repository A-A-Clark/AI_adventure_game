import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Game from './components/Game';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { token } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/game" />} />
      <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/game" />} />
      <Route path="/game" element={token ? <Game /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={token ? "/game" : "/login"} />} />
    </Routes>
  );
}

export default App;
