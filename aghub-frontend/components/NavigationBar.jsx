import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";

function NavigationBar() {
    const router = useRouter();
    const currentPath = usePathname();

    const items = [
        { name: "Start", path: "/", icon: "home" },
        { name: "Dodaj", path: "/(pages)/eventcreate", icon: "add-circle" },
        { name: "Mapa", path: "/(pages)/map", icon: "map" }
    ];

    return (
        <View className="w-full absolute bottom-0 left-0 right-0 p-4 z-10">
            <View className="bg-yellow-600 flex-row justify-between items-center w-full p-4 rounded-xl">
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
                                size={28}
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
