import axios from "axios";
import React , { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { makeRequest } from "../axios";

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const locate = window.location.origin;

  const login = async (inputs) => {
    try {
      const res = await makeRequest.post("/auth/login", inputs);
      setCurrentUser(res.data);
    } catch (err) {
      // Handle error
      Swal.fire({
        icon: "error",
        title: err.response.data,
      })
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

