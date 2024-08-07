import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        // Décoder le token pour obtenir le rôle utilisateur
        const decodedToken = jwtDecode(token);
        setIsAuthenticated(true);
        setUserRole(decodedToken.role); 
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        setIsAuthenticated(false);
        setUserRole(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
