import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { useMutation } from "@tanstack/react-query";
import { searchLocation } from "../../api/openstreetmap";

export default function LocationPickerScreen({ onConfirmLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialRegion, setInitialRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Brak uprawnień do lokalizacji");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setInitialRegion(region);
      setCurrentLocation(loc.coords);
    })();
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const searchLocationMutation = useMutation({
    mutationFn: ({ query }) => searchLocation(query),
    onSuccess: (data) => {
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const location = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };

        mapRef.current.animateToRegion(
          {
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );

        setSelectedLocation(location);
        Keyboard.dismiss();
      } else {
        alert("Nie znaleziono lokalizacji");
      }
    },
  });

  const handleSearch = async () => {
    if (!searchQuery) return;
    searchLocationMutation.mutate({ query: searchQuery });
  };

  const handleConfirm = () => {
    if (!selectedLocation) return;
    if (typeof onConfirmLocation === "function") {
      onConfirmLocation(selectedLocation);
    }
  };

  const handleUndo = () => {
    setSelectedLocation(null);
  };

  if (!initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ca8a04" />
        <Text style={styles.loadingText}>Pobieranie lokalizacji...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Wpisz lokalizację (np. Rynek Kraków)"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Szukaj</Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        onPress={handleMapPress}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} pinColor="#ca8a04">
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Twoja lokalizacja</Text>
                <Text style={styles.calloutSubtext}>
                  {currentLocation.latitude.toFixed(4)},{" "}
                  {currentLocation.longitude.toFixed(4)}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}

        {selectedLocation && (
          <Marker coordinate={selectedLocation} pinColor="green">
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>Wybrana lokalizacja</Text>
                <Text style={styles.calloutSubtext}>
                  {selectedLocation.latitude.toFixed(4)},{" "}
                  {selectedLocation.longitude.toFixed(4)}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>

      <View style={styles.bottomPanel}>
        <Text style={styles.infoText}>
          {selectedLocation
            ? `Wybrano: ${selectedLocation.latitude.toFixed(
                4
              )}, ${selectedLocation.longitude.toFixed(4)}`
            : "Kliknij na mapie lub wyszukaj lokalizację"}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleUndo}
            disabled={!selectedLocation}
          >
            <Text style={styles.buttonText}>Cofnij</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              { backgroundColor: selectedLocation ? "#22c55e" : "#4a4a4a" },
            ]}
            onPress={handleConfirm}
            disabled={!selectedLocation}
          >
            <Text style={styles.buttonText}>Zatwierdź</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 20,
    flexDirection: "row",
    gap: 8,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#2d2d2d",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#fff",
  },
  searchButton: {
    backgroundColor: "#ca8a04",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#2d2d2d",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  infoText: {
    fontSize: 14,
    color: "#eee",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "48%",
    alignItems: "center",
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "48%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  calloutContainer: {
    backgroundColor: "#2d2d2d",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#444",
    maxWidth: 200,
    alignItems: "center",
  },
  calloutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  calloutSubtext: {
    color: "#ccc",
    fontSize: 12,
  },
});
