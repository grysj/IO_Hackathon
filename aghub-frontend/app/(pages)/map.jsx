import React, { useEffect, useState, useRef } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
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
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleSearch = () => {
        const found = mockFriends.find((friend) =>
            friend.username.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (found) {
            mapRef.current.animateToRegion(
                {
                    latitude: found.latitude,
                    longitude: found.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                1000
            );
        } else {
            alert("Nie znaleziono takiego znajomego.");
        }
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
                    placeholder="Wyszukaj znajomego"
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
            >
                {/* Twoja lokalizacja */}
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

                {/* Pinezki znajomych */}
                {mockFriends.map((friend) => (
                    <Marker
                        key={friend.id}
                        coordinate={{
                            latitude: friend.latitude,
                            longitude: friend.longitude,
                        }}
                        pinColor="blue"
                    >
                        <Callout tooltip>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{friend.username}</Text>
                                <Text style={styles.calloutSubtext}>
                                    {friend.latitude.toFixed(4)}, {friend.longitude.toFixed(4)}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
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
