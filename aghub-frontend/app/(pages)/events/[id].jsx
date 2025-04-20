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
import { getPoi, getEvent, getEventParticipants } from "@/api/aghub";
import { useQuery } from "@tanstack/react-query";

// Format helpers
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return format(date, "HH:mm");
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "d MMMM yyyy");
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();

  const {
    data: event,
    isLoading: isEventLoading,
    error: eventError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => getEvent(id, signal),
    refetchInterval: 1000 * 60,
    enabled: !!id,
  });

  const {
    data: participants = [],
    isLoading: isParticipantsLoading,
    error: participantsError,
  } = useQuery({
    queryKey: ["participants", id],
    queryFn: ({ signal }) => getEventParticipants(id, signal),
    refetchInterval: 1000 * 60,
    enabled: !!id,
  });

  const {
    data: poi,
    isLoading: isPoiLoading,
    error: poiError,
  } = useQuery({
    queryKey: ["poi", event?.poiId],
    queryFn: ({ signal }) => getPoi(event.poiId, signal),
    enabled: !!event?.poiId,
  });

  const handleLocationPress = () => {
    console.log(`Pressed on location: ${poi?.name || "Unknown POI"}`);
  };

  const handleParticipantPress = (participant) => {
    console.log(`Pressed on participant: ${participant.username}`);
  };

  if (isEventLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <ActivityIndicator color="white" size="large" />
        <Text className="text-white mt-4 text-lg">Loading event...</Text>
      </View>
    );
  }

  if (eventError) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <Text className="text-white text-2xl font-semibold">
          Error loading event: {eventError.message}
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

        {/* Participants */}
        <View className="mb-8">
          <Text className="text-yellow-600 font-semibold text-2xl mb-3">
            Participants
          </Text>

          {isParticipantsLoading ? (
            <Text className="text-white text-base">
              Loading participants...
            </Text>
          ) : participantsError ? (
            <Text className="text-red-400 text-base">
              Failed to load participants: {participantsError.message}
            </Text>
          ) : participants.length === 0 ? (
            <Text className="text-white text-base">No participants yet.</Text>
          ) : (
            participants.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => handleParticipantPress(p)}
                className="flex-row items-center gap-3 bg-white/10 px-5 py-3 rounded-xl mb-3"
              >
                <Ionicons name="person" size={22} color="#ca8a04" />
                <Text className="text-white text-lg font-medium">
                  {p.username}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
