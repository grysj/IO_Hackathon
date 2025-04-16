import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function UsosScreen() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!url.trim()) {
      Alert.alert("error", "Paste link from USOS.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "http://34.116.250.33:8080/api/classes/import_usos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
            userId: user.id,
          }),
        }
      );

      const text = await response.text();

      if (response.ok) {
        Alert.alert("Your plan was successfully uploaded", text);
        setUrl("");
      } else {
        Alert.alert("error", text);
      }
    } catch (error) {
      Alert.alert("network error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>
          Paste a URL from the USOS platform to upload your schedule
        </Text>

        <TextInput
          style={styles.input}
          placeholder="https://usosweb.example.edu.pl/kalendarz.ics"
          placeholderTextColor="#999"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpload}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Uploading..." : "Upload"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    backgroundColor: "#D97706",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
