import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(null);

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
      const res = await fetch("http://34.116.250.33:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Adjust this body to match your RegisterRequest structure
      });

      if (!res.ok) {
        if (res.status === 409) {
          const data = await res.json();
          throw new Error(data.error || "User already exists");
        } else {
          throw new Error("Something went wrong");
        }
      }

      const userData = await res.json();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      // console.error("Error signing up:", error);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch("http://34.116.250.33:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          const data = await res.json();
          throw new Error(data.error || "Invalid credentials");
        } else {
          throw new Error("Something went wrong");
        }
      }

      const userData = await res.json();
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      // console.error("Error logging in:", err);
      throw err;
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
