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
import { useMutation } from "@tanstack/react-query";
import { importClassesFromUsos } from "@/api/aghub";

export default function UsosScreen() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");

  const usosImportMutation = useMutation({
    mutationFn: ({ userId, url }) => {
      return importClassesFromUsos(userId, url);
    },
    onSuccess: () => {
      setUrl("");
    },
  });

  const handleUpload = () => {
    if (!url.trim()) {
      Alert.alert("error", "Paste link from USOS.");
      return;
    }

    usosImportMutation.mutate({
      userId: user.id,
      url: url.trim(),
    });
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
          disabled={usosImportMutation.isLoading}
        >
          <Text style={styles.buttonText}>
            {usosImportMutation.isLoading ? "Uploading..." : "Upload"}
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
