import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "./authContext";

export default function HomeScreen() {
    const router = useRouter();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
            }}
        >
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Hello, world!</Text>
            <Button title="Przejdź do mapy" onPress={() => router.push("/(pages)/map")} />

            {isLoggedIn ? (
                <Button title="Wyloguj się" onPress={() => setIsLoggedIn(false)} />
            ) : (
                <Button title="Zaloguj się" onPress={() => router.push("/(auth)/login")} />
            )}
        </View>
    );
}
