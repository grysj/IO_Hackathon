import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import NavigationBar from "../../components/NavigationBar";

const Layout = () => {
  const navigationBarItems = [
    { path: "/map", name: "Map", icon: "map" },
    { path: "/eventcreate", name: "New Event", icon: "add-circle" },
    { path: "/calendar", name: "Calendar", icon: "calendar" },
    { path: "/friends", name: "Friends", icon: "people" },
    { path: "/usos", name: "Upload Plan", icon: "briefcase" },
    { path: "/user-profile", name: "Profile", icon: "person" },
  ];

  return (
    <View className="flex-1 flex flex-col">
      <View className="flex-1">
        <Slot />
      </View>
      <NavigationBar items={navigationBarItems} />
    </View>
  );
};

export default Layout;
