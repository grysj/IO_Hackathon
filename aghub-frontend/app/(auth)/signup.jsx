import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/authContext";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { setIsLoggedIn } = useAuth();

    // Simple regex to validate the email format.
    const validateEmail = (email) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    };

    const handleRegister = () => {
        if (!validateEmail(email)) {
            setError("Please provide a valid email address.");
            return;
        }
        if (username.trim().length === 0) {
            setError("Please provide a username.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError("");
        // Connect registration logic here (e.g., API call)
        setIsLoggedIn(true);
        router.replace("/");
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
                <Text style={styles.header}>Create an account</Text>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Email Field */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        placeholder="yourname@example.com"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="off"
                        textContentType="none"
                        autoCorrect={false}
                        importantForAutofill="no"
                    />
                </View>

                {/* Username Field */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        placeholder="student123"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        autoCapitalize="none"
                        autoComplete="off"
                        textContentType="none"
                        autoCorrect={false}
                        importantForAutofill="no"
                    />
                </View>

                {/* Password Field */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        autoComplete="off"
                        textContentType="none"
                        autoCorrect={false}
                        importantForAutofill="no"
                    />
                </View>

                {/* Confirm Password Field */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        autoComplete="off"
                        textContentType="none"
                        autoCorrect={false}
                        importantForAutofill="no"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                        <Text
                            style={styles.link}
                            onPress={() => router.replace("/(auth)/login")}
                        >
                            Log in
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
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        textAlign: "center",
    },
    fieldContainer: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#D97706", // matching with navbar color (yellow-600)
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#D97706", // yellow, matching navbar
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    footerText: {
        color: "#333",
    },
    link: {
        color: "#D97706",
        fontWeight: "bold",
    },
});
