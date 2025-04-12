import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Hello, world!</Text>
            <Button title="Przejdź do mapy" onPress={() => router.push("/map")} />
        </View>
    );
}
