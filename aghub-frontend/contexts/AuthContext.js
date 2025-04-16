import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  useEffect(() => {
    const getStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error getting stored user:", error);
      }
    };

    getStoredUser();
  }, []);

  const signup = async (username, email, password) => {
    try {
      const response = await fetch("http://34.116.250.33:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Adjust this body to match your RegisterRequest structure
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const userData = await response.json();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Error signing up:", error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("http://34.116.250.33:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const userData = await response.json();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      return true;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
