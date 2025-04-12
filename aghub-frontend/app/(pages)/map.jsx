import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);
    const mapRef = useRef(null);

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

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
    };

    const handleSearch = async () => {
        if (!searchQuery) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    searchQuery
                )}&format=json&limit=1`
            );
            const data = await response.json();

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
        } catch (error) {
            console.error("Błąd wyszukiwania:", error);
            alert("Błąd podczas wyszukiwania lokalizacji.");
        }
    };

    const handleConfirm = () => {
        console.log("✅ Wybrana lokalizacja:", selectedLocation);
        // TODO: przekazanie danych do parenta / backendu
    };

    const handleUndo = () => {
        setSelectedLocation(null);
    };

    if (!location) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ca8a04" />
                <Text style={styles.loadingText}>Ładowanie lokalizacji...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Wyszukaj lokalizację"
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
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
            >
                <Marker coordinate={location} pinColor="#ca8a04">
                    <Callout tooltip>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Twoja lokalizacja</Text>
                            <Text style={styles.calloutSubtext}>
                                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                            </Text>
                        </View>
                    </Callout>
                </Marker>

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1a1a1a",
    },
    map: {
        flex: 1,
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
