import React, { useState } from "react";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import FriendComponent from "../friendlist/FriendComponent";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/aghub";

const EventFriendSelector = ({ onConfirm }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const { user } = useAuth();

  const {
    data: friends,
    isLoading: isFriendsLoading,
    error: friendsError,
  } = useQuery({
    queryKey: ["friends", user.id],
    queryFn: () => getFriends(user.id),
    enabled: !!user.id,
    initialData: [],
  });

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    setSelectedIds([]);
  };

  const handleConfirm = () => {
    const updatedIds = [...selectedIds, user.id];
    const updatedFriends = friends.filter((friend) =>
      updatedIds.includes(friend.id)
    );
    onConfirm(updatedIds, updatedFriends);
  };

  if (isFriendsLoading) {
    return (
      <Box className="flex-1 justify-center items-center bg-background-50">
        <Spinner size="large" color="$yellow600" />
        <Text className="mt-4 text-yellow-700 font-semibold">
          Loading friends...
        </Text>
      </Box>
    );
  }

  if (friendsError) {
    return (
      <Box className="flex-1 justify-center items-center bg-background-50 px-4">
        <Text className="text-error-500 text-center font-semibold text-lg mb-2">
          Failed to load friends.
        </Text>
      </Box>
    );
  }

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
                  <FriendComponent friend={friend} isSelected={isSelected} />
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
