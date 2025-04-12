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
};

export default EventCreateScreen;
