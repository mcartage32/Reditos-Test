import React, { createContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  accesToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [accesToken, setAccesToken] = useState<string | null>(
    localStorage.getItem("accesToken")
  );

  useEffect(() => {
    if (accesToken) {
      localStorage.setItem("accesToken", accesToken);
    } else {
      localStorage.removeItem("accesToken");
    }
  }, [accesToken]);

  const login = (token: string) => {
    setAccesToken(token);
    queryClient.removeQueries(); // Borra TODAS las queries almacenadas
  };

  const logout = () => {
    setAccesToken(null);
    queryClient.clear(); // Limpia la caché de `react-query`
  };

  return (
    <AuthContext.Provider value={{ accesToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
