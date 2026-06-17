import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { storage } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.getUser();

    if (savedUser) {
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUser(userData);

    storage.setUser(userData);

    if (token) {
      storage.setToken(token);
    }
  };

  const logout = () => {
    setUser(null);

    storage.removeUser();

    storage.removeToken();
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    storage.setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);