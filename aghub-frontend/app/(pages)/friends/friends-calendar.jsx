import React from 'react';
import {useLocalSearchParams} from 'expo-router';

import {Box} from "@gluestack-ui/themed";
import Calendar from "../calendar";



const FriendCalendarScreen = () => {
    const params = useLocalSearchParams();

    const user = {
        id: parseInt(params.id),
        username: params.username,
        email: params.email,
    };

    return (
        <Box className="flex-1 bg-background-50">
            <Calendar user={user}/>
        </Box>)
};

export default FriendCalendarScreen;
