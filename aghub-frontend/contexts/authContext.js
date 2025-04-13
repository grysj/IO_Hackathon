import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedIsLoggedIn = await AsyncStorage.getItem("isLoggedIn");

        if (storedIsLoggedIn === "true" && storedUser) {
          setUser(JSON.parse(storedUser));
          setIsLoggedIn(true);
          router.push("/map"); // Redirect to the map page if already logged in
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedInStatus();
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
      setIsLoggedIn(true);

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isLoggedIn", "true");

      router.push("/map");
    } catch (error) {
      console.error("Error signing up:", error);
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
      setIsLoggedIn(true);

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("isLoggedIn", "true");

      router.push("/map");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    setUser(null);
    setIsLoggedIn(false);

    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("isLoggedIn");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
