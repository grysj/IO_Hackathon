import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useRouter } from "expo-router";

// Function to format the start and end time
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, "HH:mm");
};

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "yyyy - MM - dd");
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [poi, setPoi] = useState(null); // State to store POI data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch event details
        const response = await fetch(
          `http://34.116.250.33:8080/api/events/${id}`,
          {
            signal: abortController.signal,
          }
        );
        if (!response.ok) {
          throw new Error(response.statusText || "Unknown error");
        }
        const data = await response.json();
        setEvent(data);

        // Fetch POI data if poiId is present
        if (data.poiId) {
          const poiResponse = await fetch(
            `http://34.116.250.33:8080/api/poi/${data.poiId}`,
            {
              signal: abortController.signal,
            }
          );
          if (!poiResponse.ok) {
            throw new Error(poiResponse.statusText || "POI fetch error");
          }
          const poiData = await poiResponse.json();
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
          {event.name}
        </Text>

        {/* Description */}
        <View className="mb-8">
          <Text className="text-white text-base leading-relaxed">
            {event.description}
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
              {formatTime(event.dateStart)} - {formatTime(event.dateEnd)}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar" size={24} color="#ca8a04" />
            <Text className="text-white text-lg">
              {formatDate(event.dateStart)}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="mb-8">
          <Text className="text-yellow-600 font-semibold text-2xl mb-3">
            Location
          </Text>
          <TouchableOpacity
            onPress={handleLocationPress}
            className="flex-row items-center gap-3 bg-white/10 px-5 py-3 rounded-xl"
          >
            <Ionicons name="location-sharp" size={22} color="#ca8a04" />
            <Text className="text-white text-lg font-medium">
              {poi ? poi.name : "Loading POI..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
