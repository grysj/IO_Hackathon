import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "expo-router";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-background-50 p-8">
      <View className="items-center p-4">
        <View className="w-32 h-32 rounded-full bg-outline-200 mb-4" />
        <Text className="text-xl text-typography-900 font-semibold mb-1">
          {user?.username}
        </Text>
        <Text className="text-typography-400">{user?.email}</Text>
      </View>

      <View className="flex-1" />

      <View className="flex flex-col gap-4 p-4">
        <Pressable
          onPress={handleLogout}
          className="bg-red-500 rounded-xl p-4 active:opacity-80"
        >
          <Text className="text-typography-950 text-center font-semibold">
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
