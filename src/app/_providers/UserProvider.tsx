"use client";

import React, { createContext, useContext, useEffect } from "react";
import useUserStore from "@/store/useUserStore";

const UserContext = createContext<ReturnType<typeof useUserStore> | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userStore = useUserStore();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      userStore.setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
