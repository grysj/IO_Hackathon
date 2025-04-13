import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import NavigationBar from "../../components/NavigationBar";

const Layout = () => {
  const navigationBarItems = [
      { path: "/map", name: "Map", icon: "map" },
      {path: "/eventcreate", name: "New Event", icon:"add-circle"},
      {path: "/calendar", name:"Calendar", icon:"calendar"},
      {path: "/friends", name:"Friends", icon:"people"},
      {path: "/usos", name:"Upload Plan", icon:"briefcase-sharp"}
  ];

  return (
    <View className="flex flex-col min-h-screen">
      <Slot />
      <NavigationBar items={navigationBarItems} />
    </View>
  );
};

export default Layout;
