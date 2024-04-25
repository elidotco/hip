import React, { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../services/config";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUsers(user.uid);
        console.log(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
        setUsers(null);
        console.log("SIgned Out");
      }
    });
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Logout function
  const logout = async () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AuthContext.Provider value={{ users, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
