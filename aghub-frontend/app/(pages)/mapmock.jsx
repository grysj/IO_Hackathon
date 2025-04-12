import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function MapMockScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl">Tabs</Text>
      <Link href="/" asChild>
        <Pressable className="bg-primary-500 px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Go to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}
