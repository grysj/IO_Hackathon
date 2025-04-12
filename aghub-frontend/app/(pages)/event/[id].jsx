import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const mockEvents = {
  1: {
    name: "Flany",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    date: "April 20, 2025",
    start: "15:00",
    end: "18:30",
    location: "Miasteczko",
    friends: ["Piotr Błaszczyk", "Joachim Grys", "Stanisław Barycki"],
  },
  2: {
    name: "Wycieczka do studenciaka",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    date: "May 3, 2025",
    start: "09:00",
    end: "22:00",
    location: "d17",
    friends: ["Piotr Błaszczyk", "Krzysztof Swędzioł"],
  },
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setEvent(mockEvents[id]);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleFriendPress = (friend) => {
    console.log(`Pressed on friend: ${friend}`);
  };

  const handleLocationPress = () => {
    console.log(`Pressed on location: ${event.location}`);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <ActivityIndicator color="white" size="large" />
        <Text className="text-white mt-4 text-lg">Loading event...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50">
        <Text className="text-white text-2xl font-semibold">
          Event not found.
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
              {event.start} - {event.end}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Ionicons name="calendar" size={24} color="#ca8a04" />
            <Text className="text-white text-lg">{event.date}</Text>
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
              {event.location}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Friends Going */}
        <View>
          <Text className="text-yellow-600 font-semibold text-2xl mb-3">
            Friends Going
          </Text>
          {event.friends.map((friend, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleFriendPress(friend)}
              className="flex-row items-center gap-3 bg-white/10 px-5 py-3 rounded-xl mb-3"
            >
              <MaterialIcons name="person" size={22} color="#ca8a04" />
              <Text className="text-white text-lg font-medium">{friend}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
