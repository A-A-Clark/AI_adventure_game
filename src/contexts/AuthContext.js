import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      try {
        console.log("Token:", token); // Debug: log the token
        // Decode the token to get user details
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded); // Debug: log the decoded payload
        setUser({
          id: decoded.id,
          email: decoded.email,
          username: decoded.username
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
