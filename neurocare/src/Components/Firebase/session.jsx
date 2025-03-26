// src/Components/Firebase/session.js

import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import { auth } from "./firebase";
import { useEffect, createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

// Create Auth Context
export const AuthContext = createContext();

// AuthProvider Component to manage user session
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Protected Route Component


export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
