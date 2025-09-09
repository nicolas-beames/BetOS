import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isGuest: true,
    isGestor: false,
    isTecnico: false,
  });

  useEffect(() => {
    logout();
  }, []);

  const logout = () => {
    setAuth({
      isGuest: true,
      isGestor: false,
      isTecnico: false,
    });
  };

  const souTecnico = () => {
    console.log("Sou Tecnico");
    setAuth({
      isGuest: false,
      isGestor: false,
      isTecnico: true,
    });
  };

  const souGestor = () => {
    console.log("Sou Gestor");
    setAuth({
      isGuest: false,
      isGestor: true,
      isTecnico: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, souGestor, souTecnico, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
