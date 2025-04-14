import React, {useContext, useEffect, useState} from 'react';
import {Box, ScrollView, VStack} from '@gluestack-ui/themed'

import {useRouter} from "expo-router";
import {useAuth} from "../../contexts/authContext";
import {mockFriends} from "../../mock/MockedData";
import FriendComponent from "../../components/friendlist/FriendComponent";


const FriendsScreen = () => {
    const {user} = useAuth();

    const router = useRouter();
    const [friends, setFriends] = useState([]);
    const fetchFriends = async (userId) => {
        try {
            const response = await fetch(`http://34.116.250.33:8080/api/friends/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Błąd pobierania znajomych');

            const data = await response.json();
            setFriends(data);
        } catch (error) {
            console.error(error);
        }
    };


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