import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; phone: string } | null;
  login: (name: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("sendresqpls_auth") === "true";
  });
  const [user, setUser] = useState<{ name: string; phone: string } | null>(() => {
    const storedUser = localStorage.getItem("sendresqpls_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (name: string, phone: string) => {
    setIsAuthenticated(true);
    const userData = { name, phone };
    setUser(userData);
    localStorage.setItem("sendresqpls_auth", "true");
    localStorage.setItem("sendresqpls_user", JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("sendresqpls_auth");
    localStorage.removeItem("sendresqpls_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
