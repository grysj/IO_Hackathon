import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import NavigationBar from "../../components/NavigationBar";

const Layout = () => {
  const navigationBarItems = [{ path: "/map", name: "Map", icon: "map" }];

  return (
    <View className="flex flex-col min-h-screen">
      <Slot />
      <NavigationBar items={navigationBarItems} />
    </View>
  );
};

export default Layout;
