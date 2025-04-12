import React from "react";
import { Box, Text, Pressable } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";

const EventCreateScreen = () => {
    const router = useRouter();

    const handleNavigateToFriends = () => {
        router.push("/selectfriends");
    };

    return (
        <Box className="flex-1 bg-background-50 p-4 justify-center">
            <Text className="text-lg font-bold mb-4">Tworzenie wydarzenia</Text>

            <Pressable
                onPress={handleNavigateToFriends}
                className="bg-primary-500 py-3 px-6 rounded-xl items-center"
            >
                <Text className="text-background-light font-bold">Wybierz znajomych</Text>
            </Pressable>
        </Box>
    );
};

export default EventCreateScreen;
