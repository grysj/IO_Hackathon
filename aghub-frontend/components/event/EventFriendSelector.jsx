import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native"
import {Pressable, Text,} from "@gluestack-ui/themed";
import {useAuth} from "../../contexts/AuthContext";
import FriendComponent from "../friendlist/FriendComponent";
import ScrollView from "../ui/scrollview/StyledScrollView";
import PageView from "../ui/PageView";
import PageHeader from "../ui/PageHeader";
import {Ionicons} from "@expo/vector-icons";
import HBox from "../ui/HBox";

const EventFriendSelector = ({initialFriendsId, onConfirm}) => {
    const [friends, setFriends] = useState([]);
    const [selectedIds, setSelectedIds] = useState(initialFriendsId || []);
    const {user} = useAuth();
    const fetchFriends = async (userId) => {
        try {
            const response = await fetch(
                `http://34.116.250.33:8080/api/friends/${userId}`,
                {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
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
        const selectedFriends = friends.filter(friend =>
            selectedIds.includes(friend.id)
        );
        onConfirm(selectedIds, selectedFriends);
    };

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