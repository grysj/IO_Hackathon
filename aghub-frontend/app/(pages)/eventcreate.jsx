<<<<<<< Updated upstream
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
