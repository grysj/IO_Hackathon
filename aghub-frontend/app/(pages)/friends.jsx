import React, {useContext, useEffect, useState} from 'react';
import {Box, ScrollView, VStack} from '@gluestack-ui/themed'
import {mockFriends} from "../../mock/MockedData";
import {useAuth} from "../../contexts/authContext";
import FriendComponent from "../../components/friendlist/FriendComponent";
import {View} from "react-native";

const FriendsScreen = () => {
    const {user} = useAuth();
    const [friends, setFriends] = useState([]);
    const fetchFriends = (userId) => {
        setFriends(mockFriends);
    }
    useEffect(() => {
        fetchFriends(user.id)
    }, []);
    const removeFriend = (friendId) => {
        fetchFriends()
    }
    const goToCalendar=(userId)=>{

    }
    return (

        <Box className="flex-1 bg-background-50">
            <ScrollView>
                <VStack space="md" className={"p-3"}>
                    {friends.map((friend) => {
                        return (<FriendComponent key={friend.id} onClickRemove={removeFriend} onClickClalendar={goToCalendar()} friend={friend}/>)
                    })}
                </VStack>
            </ScrollView>
        </Box>

    )
};
export default FriendsScreen;