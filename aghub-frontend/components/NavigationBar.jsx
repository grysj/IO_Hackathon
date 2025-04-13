import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

function NavigationBar({ items }) {
    const router = useRouter();
    const currentPath = usePathname();

    return (
        <View className="w-full absolute bottom-0 left-0 right-0 z-10">
            <View className="bg-yellow-600 flex-row justify-between items-center px-6 pt-4 pb-9 w-full">
                {items.map((item, index) => {
                    const isActive = currentPath.includes(item.path);

                    return (
                        <TouchableOpacity
                            key={index}
                            className="flex-1 justify-center items-center"
                            onPress={() => router.push(item.path)}
                        >
                            <Ionicons
                                name={isActive ? item.icon : `${item.icon}-outline`}
                                size={24}
                                color="white"
                            />
                            <Text className="text-xs mt-1 text-white">{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

export default NavigationBar;
