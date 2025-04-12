import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function AvailabilityScreen() {
    const router = useRouter();

    const handleGoToLocationPicker = () => {
        router.push("/(pages)/locationpicker");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dostępność znajomych</Text>
            <Text style={styles.subtitle}>
                Tutaj w przyszłości wyświetlimy wspólne terminy w kalendarzu.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleGoToLocationPicker}>
                <Text style={styles.buttonText}>Przejdź do wyboru lokalizacji</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffef8",
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 24,
    },
    button: {
        backgroundColor: "#ca8a04",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
