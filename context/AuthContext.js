import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../pages/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user object when authenticated
      } else {
        setUser(null); // Set user to null when logged out
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
