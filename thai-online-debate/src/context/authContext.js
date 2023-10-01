import axios from "axios";
import React , { createContext, useEffect, useState } from "react";


export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/auth/login",
        inputs,
        {
          withCredentials: true,
        }
      );
      setCurrentUser(res.data);
    } catch (error) {
      // Handle error
      alert(error.response.data);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const contextValue = {
    currentUser,
    login, // Include the login function in the context value
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

