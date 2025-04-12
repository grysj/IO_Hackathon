<<<<<<< Updated upstream
import { useRouter } from "expo-router";
import { Button } from "react-native";
import { Box } from "@gluestack-ui/themed";

const EventCreateScreen = () => {
    const router = useRouter();

    return (
        <Box className="flex-1 bg-background-50 justify-center items-center">
            {/* Placeholder */}
            <Button title="Przejdź do dostępnych terminów" onPress={() => router.push("/(pages)/availability")} />
        </Box>
    );
=======
import {useEffect, useState} from "react";
import {Box, Text} from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";

const EventCreateScreen = () => {
    const [friends, setFriends] = useState([])
    const onConfirm = (ids) => {
        setFriends(ids)
    }
    return (
        <Box className="flex-1 bg-background-50">
            <FriendSelector onConfirm={onConfirm}/>
            <Text>
            {`${friends}`}
            </Text>
        </Box>)
>>>>>>> Stashed changes
};

export default EventCreateScreen;
