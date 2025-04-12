import React, { useState, useEffect } from "react";
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

        {isLoggedIn ? (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/map")}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsLoggedIn(false)}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/(auth)/signup")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
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
