import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

// Mock danych znajomych
const mockFriends = [
    {
        id: 1,
        username: "alicee",
        latitude: 50.062,
        longitude: 19.937,
    },
    {
        id: 2,
        username: "bob",
        latitude: 50.064,
        longitude: 19.938,
    },
    {
        id: 3,
        username: "charlie",
        latitude: 50.060,
        longitude: 19.935,
    },
];

export default function MapScreen() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Ty"
          description="Twoja lokalizacja"
        />

        <Marker
          coordinate={{
            latitude: location.latitude + 0.002,
            longitude: location.longitude + 0.002,
          }}
          title="Znajomy 1"
          description="Przykładowy użytkownik"
          pinColor="blue"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
