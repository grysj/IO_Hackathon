import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { getPoi, getClass } from "@/api/aghub";
import { useQuery } from "@tanstack/react-query";

// Format helpers
const formatTime = (dateString) => format(new Date(dateString), "HH:mm");
const formatDate = (dateString) => format(new Date(dateString), "d MMMM yyyy");

export default function ClassDetails() {
  const { id } = useLocalSearchParams();

  const {
    data: classEvent,
    isLoading: isClassLoading,
    error: classError,
  } = useQuery({
    queryKey: ["classEvent", id],
    queryFn: ({ signal }) => getClass(id, signal),
    refetchInterval: 1000 * 60,
    enabled: !!id,
  });

  const {
    data: poi,
    isLoading: isPoiLoading,
    error: poiError,
  } = useQuery({
    queryKey: ["poi", classEvent?.poiId],
    queryFn: ({ signal }) => getPoi(classEvent.poiId, signal),
    enabled: !!classEvent?.poiId,
  });

  const handleLocationPress = () => {
    console.log(`Pressed on location: ${poi?.name || "Unknown location"}`);
  };

  if (isClassLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <ActivityIndicator color="white" size="large" />
        <Text className="text-white mt-4 text-lg">Loading class...</Text>
      </View>
    );
  }

  if (classError) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <Text className="text-white text-2xl font-semibold">
          Error loading class: {classError.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background-50">
      <View className="px-6 py-8">
        {/* Title */}
        <Text className="text-yellow-600 text-4xl font-bold mb-2">
          {classEvent.name}
        </Text>

        {/* Room */}
        <View className="mb-8">
          <Text className="text-white text-base leading-relaxed">
            Room {classEvent.room}
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
              {formatTime(classEvent.dateStart)} -{" "}
              {formatTime(classEvent.dateEnd)}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar" size={24} color="#ca8a04" />
            <Text className="text-white text-lg">
              {formatDate(classEvent.dateStart)}
            </Text>
          </View>
        </View>

        {/* Location */}
        <View className="mb-8">
          <Text className="text-yellow-600 font-semibold text-2xl mb-3">
            Location
          </Text>
          {isPoiLoading ? (
            <Text className="text-white text-base">Loading location...</Text>
          ) : poiError ? (
            <Text className="text-red-400 text-base">
              Failed to load location: {poiError.message}
            </Text>
          ) : (
            <Pressable
              onPress={handleLocationPress}
              className="flex-row items-center gap-3 bg-white/10 px-5 py-3 rounded-xl"
            >
              <Ionicons name="location-sharp" size={22} color="#ca8a04" />
              <Text className="text-white text-lg font-medium">
                {poi?.name || "Unknown location"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
