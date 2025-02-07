"use client";
import { getUser } from "@/services/getUser";
import React, { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  userId: string | null;
  setUserId: (id: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userId: null,
  setUserId: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getUser(token)
        .then((response) => {
          if (response.success && response.userId) {
            setUserId(response.userId);
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setIsLoggedIn(false);
          setUserId(null);
        });
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId }}>{children}</AuthContext.Provider>
  );
};
