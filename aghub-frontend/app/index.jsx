import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function HomeScreen() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* LOGO */}
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.header}>Hello, world!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(pages)/map")}
        >
          <Text style={styles.buttonText}>Przejdź do mapy</Text>
        </TouchableOpacity>

        {isLoggedIn ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsLoggedIn(false)}
          >
            <Text style={styles.buttonText}>Wyloguj się</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.buttonText}>Zaloguj się</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(auth)/register")}
            >
              <Text style={styles.buttonText}>Zarejestruj się</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 300,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 133,
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#D97706",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
