import React from "react";
import { Box, ScrollView, VStack, Text, View } from "@gluestack-ui/themed";

import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

import FriendListComponent from "../../components/friendlist/FriendListComponent";
import AddFriendButton from "../../components/friendlist/AddFriendButton";
import Divider from "../../components/ui/Divider";

import { useQuery } from "@tanstack/react-query";
import { getFriends } from "@/api/aghub";

const FriendsScreen = () => {
  const { user } = useAuth();

  const router = useRouter();
  const handlePress = () => {
    router.push({
      pathname: "/friends/find-friends",
    });
  };

  const {
    data: friends,
    isLoading: isFriendsLoading,
    error: friendsError,
  } = useQuery({
    queryKey: ["friends", user.id],
    queryFn: ({ signal }) => getFriends(user.id, signal),
    enabled: !!user.id,
  });

  const removeFriend = (friendId) => {
    // TODO
  };

  const goToCalendar = (friend) => {
    router.push({
      pathname: "/friends/friends-calendar",
      params: friend,
    });
  };

  if (isFriendsLoading) {
    return (
      <Box className="flex-1 place-content-center bg-background-50">
        <Text className="text-white mt-2 text-lg px-4 py-2 font-semibold">
          Loading friends...
        </Text>
      </Box>
    );
  }

  if (friendsError) {
    return (
      <Box className="flex-1 bg-background-50">
        <Text className="text-white mt-2 text-lg px-4 py-2 font-semibold">
          Error loading friends: {friendsError.message}
        </Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-background-50">
      <View justifyContent="space-between" className="flex-row ">
        <Text className="text-white mt-2 text-lg px-4 py-2 font-semibold">
          Friends list:
        </Text>
        <AddFriendButton onClick={handlePress} />
      </View>
      <Divider marginHorizontal={4} />
      <ScrollView>
        <VStack space="md" className={"p-3"}>
          {friends.map((friend) => {
            return (
              <FriendListComponent
                key={friend.id}
                onClickRemove={removeFriend}
                onClickCalendar={goToCalendar}
                friend={friend}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};
export default FriendsScreen;
