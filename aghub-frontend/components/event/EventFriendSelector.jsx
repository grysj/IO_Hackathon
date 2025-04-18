import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { mockFriends } from "../../mock/MockedData";
import { useAuth } from "../../contexts/AuthContext";

const EventFriendSelector = ({ onConfirm }) => {
  const [friends, setFriends] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const { user } = useAuth();
  const fetchFriends = async (userId) => {
    try {
      const response = await fetch(
        `http://34.116.250.33:8080/api/friends/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Błąd pobierania znajomych");

      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFriends(user.id);
  }, []);

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    setSelectedIds([]);
  };

  const handleConfirm = () => {
    const updated = [...selectedIds, user.id]
    onConfirm(updated);
  };

  return (
    <Box className="flex-1 bg-background-50 p-4">
      <Text className="text-xl font-bold text-typography-950 mb-4">
        Wybierz znajomych
      </Text>

      <ScrollView className="mb-4">
        <Box justifyContent="space-between">
          <VStack space="md">
            {friends.map((friend) => {
              const isSelected = selectedIds.includes(friend.id);

              return (
                <Pressable
                  key={friend.id}
                  onPress={() => toggleSelection(friend.id)}
                  className={`rounded-lg p-3 border mb-3 flex-row items-center ${
                    isSelected
                      ? "bg-yellow-600 border-yellow-700"
                      : "bg-background-100 border-outline-200"
                  }`}
                >
                  <Box className="mr-4">
                    <MaterialIcons name="person" size={30} color="white" />
                  </Box>
                  <Box>
                    <Text
                      className={`font-semibold ${
                        isSelected ? "text-white" : "text-typography-900"
                      }`}
                    >
                      {friend.username}
                    </Text>
                    <Text
                      className={`text-xs ${
                        isSelected ? "text-yellow-100" : "text-typography-500"
                      }`}
                    >
                      {friend.email}
                    </Text>
                  </Box>
                </Pressable>
              );
            })}
          </VStack>
          <HStack
            space="md"
            justifyContent="space-between"
            className="flex flex-row mt-4"
          >
            <Pressable
              onPress={handleCancel}
              className="flex-1 items-center py-2 rounded-xl bg-background-muted"
            >
              <Text className="text-error-500 font-bold">Anuluj</Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              disabled={selectedIds.length === 0}
              className={`flex-1 items-center py-2 rounded-xl ml-2 ${
                selectedIds.length === 0
                  ? "bg-background-muted"
                  : "bg-yellow-600"
              }`}
            >
              <Text className="text-background-light font-bold">Potwierdź</Text>
            </Pressable>
          </HStack>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default EventFriendSelector;
