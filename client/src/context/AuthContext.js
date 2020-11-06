import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import Loading from "../components/Loading";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gMessage, setGMessage] = useState(null);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated, gMessage, setGMessage }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
