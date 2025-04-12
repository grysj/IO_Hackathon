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

    // Prosty regex sprawdzający, czy email wygląda sensownie.
    const validateEmail = (email) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    };

    const handleRegister = () => {
        if (!validateEmail(email)) {
            setError("Podaj poprawny adres email.");
            return;
        }
        if (username.trim().length === 0) {
            setError("Podaj nazwę użytkownika.");
            return;
        }
        if (password.length < 8) {
            setError("Hasło musi mieć minimum 8 znaków.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Hasła nie są zgodne.");
            return;
        }
        setError("");
        // Tutaj można podpiąć logikę rejestracji (np. wywołanie API)
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
                <Text style={styles.header}>Rejestracja</Text>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Pole Email */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Wpisz adres email"
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

                {/* Pole Nazwa użytkownika */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Nazwa użytkownika</Text>
                    <TextInput
                        placeholder="Wpisz nazwę użytkownika"
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

                {/* Pole Hasło */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Hasło</Text>
                    <TextInput
                        placeholder="Hasło"
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

                {/* Pole Powtórz hasło */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Powtórz hasło</Text>
                    <TextInput
                        placeholder="Powtórz hasło"
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
                    <Text style={styles.buttonText}>Zarejestruj się</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Masz już konto?{" "}
                        <Text style={styles.link} onPress={() => router.replace("/(auth)/login")}>
                            Zaloguj się
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
        borderColor: "#D97706", // dopasowane do navbar (yellow-600)
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 45,
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#D97706", // żółty, pasuje do navbar
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
        color: "blue",
        textDecorationLine: "underline",
    },
});
