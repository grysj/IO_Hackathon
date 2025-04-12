import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function LoginScreen() {
  const router = useRouter();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Simulate login - connect to the actual API here
    setIsLoggedIn(true);
    router.replace("/");
  };

  const handleSignUp = () => {
    router.push("/signup"); // Navigate to the Sign Up screen
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="yourname@example.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="off"
            textContentType="none"
            autoCorrect={false}
            importantForAutofill="no"
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="off"
            textContentType="none"
            autoCorrect={false}
            importantForAutofill="no"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account yet?{" "}
            <Text style={styles.signupLink} onPress={handleSignUp}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D97706", // Consistent with the navbar color
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#D97706",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#333",
    fontSize: 14,
  },
  signupLink: {
    color: "#D97706",
    fontWeight: "bold",
  },
});
