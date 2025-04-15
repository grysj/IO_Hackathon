import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";

// Format helpers
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, "HH:mm");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy"); // This will give you e.g., "4 April 2025"
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [classes, setClasses] = useState(null);
  const [poi, setPoi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch event
        const eventRes = await fetch(
          `http://34.116.250.33:8080/api/classes/${id}`,
          { signal: abortController.signal }
        );
        if (!eventRes.ok) throw new Error(eventRes.statusText || "Event error");
        const eventData = await eventRes.json();
        setClasses(eventData);

        // Fetch POI
        if (eventData.poiId) {
          const poiRes = await fetch(
            `http://34.116.250.33:8080/api/poi/${eventData.poiId}`,
            { signal: abortController.signal }
          );
          if (!poiRes.ok) throw new Error(poiRes.statusText || "POI error");
          const poiData = await poiRes.json();
          setPoi(poiData);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    return () => {
      abortController.abort();
    };
  }, [id]);

  const handleLocationPress = () => {
    console.log(`Pressed on location: ${poi ? poi.name : "Unknown location"}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <ActivityIndicator color="white" size="large" />
        <Text className="text-white mt-4 text-lg">Loading event...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <Text className="text-white text-2xl font-semibold">
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background-50">
      <View className="px-6 py-8">
        {/* Title */}
        <Text className="text-yellow-600 text-4xl font-bold mb-2">
          {classes.name}
        </Text>

        {/* Room */}
        <View className="mb-8">
          <Text className="text-white text-base leading-relaxed">
            Room {classes.room}
          </Text>
        </View>

        {/* Time */}
        <View className="mb-8 space-y-10">
          <Text className="text-yellow-600 font-semibold text-2xl mb-2">
            Time
          </Text>
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="time" size={22} color="#ca8a04" />
            <Text className="text-white text-lg">
              {formatTime(classes.dateStart)} - {formatTime(classes.dateEnd)}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar" size={24} color="#ca8a04" />
            <Text className="text-white text-lg">
              {formatDate(classes.dateStart)}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="mb-8">
          <Text className="text-yellow-600 font-semibold text-2xl mb-3">
            Location
          </Text>
          <Pressable
            onPress={handleLocationPress}
            className="flex-row items-center gap-3 bg-white/10 px-5 py-3 rounded-xl"
          >
            <Ionicons name="location-sharp" size={22} color="#ca8a04" />
            <Text className="text-white text-lg font-medium">
              {poi ? poi.name : "Loading POI..."}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
