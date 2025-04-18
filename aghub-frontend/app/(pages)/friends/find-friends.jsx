import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import AddFriendComponent from "@/components/friendlist/AddFriendComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewFriends, addNewFriend } from "@/api/aghub";

const FindFriendsScreen = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();

  const {
    data: newFriends,
    isLoading: isNewFriendsLoading,
    error: newFriendsError,
  } = useQuery({
    queryKey: ["newFriends", user.id],
    queryFn: ({ signal }) => getNewFriends(user.id, signal),
    enabled: !!user.id,
  });

  const addNewFriendMutation = useMutation({
    mutationFn: ({ userId, friendId }) => {
      return addNewFriend(userId, friendId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["newFriends", user.id]);
      setSearchQuery("");
    },
  });

  const handleAddNewFriend = (friendId) => {
    addNewFriendMutation.mutate({ userId: user.id, friendId });
  };

  const query = searchQuery.toLowerCase();
  const filteredFriends = newFriends?.filter(
    (friend) =>
      friend.username.toLowerCase().includes(query) ||
      friend.email.toLowerCase().includes(query)
  );

  if (isNewFriendsLoading) {
    return (
      <View style={styles.flex}>
        <ActivityIndicator size="large" color="#ca8a04" />
        <Text style={styles.loadingText}>Loading new friends...</Text>
      </View>
    );
  }

  if (newFriendsError) {
    return (
      <View style={styles.flex}>
        <Text style={styles.errorText}>
          Error loading new friends: {newFriendsError.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Search new friends..."
          placeholderTextColor={"#ca8a04"}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text.toLowerCase())}
        />
      </View>

      <ScrollView>
        <View style={styles.listContainer}>
          {filteredFriends.map((friend) => (
            <AddFriendComponent
              key={friend.id}
              friend={friend}
              onAddNewFriend={handleAddNewFriend}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FindFriendsScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    padding: 10,
    backgroundColor: "#272625", // albo dynamicznie z theme
  },
  header: {},
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ca8a04",
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 12,
  },
  input: {
    borderWidth: 2,
    backgroundColor: "#e4e4e4",
    borderColor: "#ca8a04",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    fontSize: 16,
    color: "#ca8a04",
    marginBottom: 20,
  },
});
