import React, { useEffect, useState } from 'react';
import { Box, HStack, VStack, Text, Pressable, ScrollView, Checkbox } from '@gluestack-ui/themed';
// import { fetchFriendsFromBackend } from '../api/friends'; // przykładowy fetch

const mockFriends = [
    { id: 1, username: 'alice', email: 'alice@example.com' },
    { id: 2, username: 'bob', email: 'bob@example.com' },
    { id: 3, username: 'charlie', email: 'charlie@example.com' },
];

const FriendSelector = ({ onConfirm }) => {
    const [friends, setFriends] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

    // ⏬ symulacja pobierania z backendu
    useEffect(() => {
        // const fetchData = async () => {
        //   const response = await fetchFriendsFromBackend();
        //   setFriends(response);
        // };
        // fetchData();

        // Na razie używamy mocka:
        setFriends(mockFriends);
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
        onConfirm(selectedIds);
    };

    return (
        <Box className="flex-1 bg-background-50 p-4">
            <Text className="text-xl font-bold text-typography-950 mb-4">Wybierz znajomych</Text>

            <ScrollView className="mb-4">
                <VStack space="md">
                    {friends.map((friend) => (
                        <Pressable
                            key={friend.id}
                            className="flex-row items-center bg-background-100 rounded-lg p-3 border border-outline-200"
                            onPress={() => toggleSelection(friend.id)}
                        >
                            <Checkbox
                                isChecked={selectedIds.includes(friend.id)}
                                onChange={() => toggleSelection(friend.id)}
                                className="mr-3 border-outline-300"
                            />
                            <Box>
                                <Text className="text-typography-900 font-semibold">{friend.username}</Text>
                                <Text className="text-typography-500 text-xs">{friend.email}</Text>
                            </Box>
                        </Pressable>
                    ))}
                </VStack>
            </ScrollView>

            {/* Przyciski akcji */}
            <HStack space="md" justifyContent="space-between">
                <Pressable
                    onPress={handleCancel}
                    className="flex-1 items-center py-2 rounded-xl bg-background-muted"
                >
                    <Text className="text-error-500 font-bold">Anuluj</Text>
                </Pressable>

                <Pressable
                    onPress={handleConfirm}
                    className="flex-1 items-center py-2 rounded-xl bg-primary-500"
                >
                    <Text className="text-background-light font-bold">Potwierdź</Text>
                </Pressable>
            </HStack>
        </Box>
    );
};

export default FriendSelector;
