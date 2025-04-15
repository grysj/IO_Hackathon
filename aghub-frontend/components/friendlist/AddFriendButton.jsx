import React from "react";
import {Pressable} from "react-native";
import {Box, Text} from "@gluestack-ui/themed";
import {Ionicons} from "@expo/vector-icons";

const AddFriendButton = ({onClick}) => {

    return (
        <Pressable onPress={onClick} className="w-[120px] bg-yellow-600 mr-4 mt-2 rounded-xl items-center justify-center">
            <Box className="flex-row items-center">
                <Ionicons name="person-add-outline" size={20} color="white"/>
                <Text className="text-white font-semibold ml-2">Add Friend</Text>
            </Box>
        </Pressable>
)
}; export default AddFriendButton
