import React, {useContext, useEffect, useState} from 'react';
import {Box, ScrollView, VStack} from '@gluestack-ui/themed'
import {mockFriends} from "../../mock/MockedData";
import {useAuth} from "../../contexts/authContext";
import FriendComponent from "../../components/friendlist/FriendComponent";
import {useRouter} from "expo-router";


const FriendsScreen = () => {
    const {user} = useAuth();
    const router = useRouter();
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
    const goToCalendar=(friend)=>{
            router.push({
                pathname: "/friends/friends-calendar",
                params: friend,
            });
    }
    return (

        <Box className="flex-1 bg-background-50">
            <ScrollView>
                <VStack space="md" className={"p-3"}>
                    {friends.map((friend) => {
                        return (<FriendComponent key={friend.id} onClickRemove={removeFriend} onClickCalendar={goToCalendar} friend={friend}/>)
                    })}
                </VStack>
            </ScrollView>
        </Box>

    )
};
export default FriendsScreen;