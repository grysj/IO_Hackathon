import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRouter } from "expo-router";

export default function LocationPickerScreen() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const mapRef = useRef(null);
    const router = useRouter();

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
        if (!selectedLocation) return;
        console.log("Wybrana lokalizacja:", selectedLocation);
        router.replace("/");
    };

    const handleUndo = () => {
        setSelectedLocation(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Wpisz lokalizację (np. Rynek Kraków)"
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
                style={styles.map}
                onPress={handleMapPress}
                initialRegion={{
                    latitude: 50.06143,
                    longitude: 19.93658,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title="Wybrana lokalizacja"
                        tracksViewChanges={false}
                    />
                )}
            </MapView>

            <View style={styles.bottomPanel}>
                <Text style={styles.infoText}>
                    {selectedLocation
                        ? `Wybrano: ${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`
                        : "Kliknij na mapie lub wyszukaj lokalizację"}
                </Text>

                {selectedLocation && (
                    <TouchableOpacity style={styles.undoButton} onPress={handleUndo}>
                        <Text style={styles.undoText}>Cofnij</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        { backgroundColor: selectedLocation ? "#22c55e" : "#ccc" },
                    ]}
                    onPress={handleConfirm}
                    disabled={!selectedLocation}
                >
                    <Text style={styles.confirmText}>Zatwierdź lokalizację</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    searchContainer: {
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: "row",
        gap: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        elevation: 2,
    },
    searchButton: {
        backgroundColor: "#ca8a04",
        borderRadius: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        elevation: 2,
    },
    searchButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    bottomPanel: {
        position: "absolute",
        bottom: 110,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        alignItems: "center",
    },
    infoText: {
        fontSize: 14,
        marginBottom: 10,
        color: "#444",
        textAlign: "center",
    },
    confirmButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    confirmText: {
        color: "#fff",
        fontWeight: "bold",
    },
    undoButton: {
        marginBottom: 12,
        backgroundColor: "#d9534f",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    undoText: {
        color: "#fff",
        fontWeight: "600",
    },
});
