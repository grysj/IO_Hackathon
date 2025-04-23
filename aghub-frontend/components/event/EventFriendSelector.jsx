import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native"
import {Pressable, Spinner, Text,} from "@gluestack-ui/themed";
import FriendComponent from "../friendlist/FriendComponent";
import ScrollView from "../ui/scrollview/StyledScrollView";
import PageView from "../ui/PageView";
import PageHeader from "../ui/PageHeader";
import {Ionicons} from "@expo/vector-icons";
import HBox from "../ui/HBox";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../../api/aghub";

const EventFriendSelector = ({initialFriendsId, onConfirm}) => {
    const [selectedIds, setSelectedIds] = useState(initialFriendsId || []);
    const {user} = useAuth();


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
      <View className="flex-1 justify-center items-center bg-background-50">
        <Spinner size="large" color="$yellow600" />
        <Text className="mt-4 text-yellow-700 font-semibold">
          Loading friends...
        </Text>
      </View>
    );
  }

  if (friendsError) {
    return (
      <View className="flex-1 justify-center items-center bg-background-50 px-4">
        <Text className="text-error-500 text-center font-semibold text-lg mb-2">
          Failed to load friends.
        </Text>
      </View>
    );
  }

    return (
        <PageView>
            <PageHeader>
                <Ionicons name="person-add" size={24} color="#ca8a04"/>
                <Text style={styles.title}>
                    Wybierz znajomych
                </Text>
            </PageHeader>

            <ScrollView>
                {friends.map((friend) => {
                    const isSelected = selectedIds.includes(friend.id);

                    return (
                        <Pressable
                            key={friend.id}
                            onPress={() => toggleSelection(friend.id)}
                            style={[styles.itemContainer, isSelected && styles.selectedItem]}
                        >
                            <FriendComponent friend={friend} isSelected={isSelected}/>
                        </Pressable>
                    );
                })}
                <HBox>
                    <TouchableOpacity onPress={handleCancel} style={styles.button}>
                        <Text style={styles.cancelText}>Anuluj</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleConfirm}
                        disabled={selectedIds.length === 0}
                        style={[
                            styles.button,
                            selectedIds.length !== 0 && styles.confirmButtonEnabled,
                        ]}
                    >
                        <Text style={styles.confirmText}>Potwierdź</Text>
                    </TouchableOpacity>
                </HBox>
            </ScrollView>
        </PageView>
    );
};

export default EventFriendSelector;
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: 700,
        color: "white",
    },
    itemContainer: {
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#414040",
        borderColor: "#535252"
    },
    selectedItem: {
        backgroundColor: "#ca8a04",
        borderColor: "#a16207",
    },

    button: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: "#333333",
    },
    cancelText: {
        color: "#ef4444", // text-error-500
        fontWeight: "bold",
    },
    confirmButtonEnabled: {
        backgroundColor: "#ca8a04", // bg-yellow-600
    },

    confirmText: {
        color: "#fefce8", // text-background-light
        fontWeight: "bold",
    },
})