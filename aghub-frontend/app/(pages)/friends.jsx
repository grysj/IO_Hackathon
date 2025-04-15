import React, {useContext, useEffect, useState} from 'react';
import {Box, ScrollView, VStack} from '@gluestack-ui/themed'

import {useRouter} from "expo-router";
import {useAuth} from "../../contexts/authContext";
import {mockFriends} from "../../mock/MockedData";
import FriendComponent from "../../components/friendlist/FriendComponent";
import AddFriendButton from "../../components/friendlist/AddFriendButton";



const FriendsScreen = () => {
    const {user} = useAuth();

    const router = useRouter();
    const handlePress = () => {
        router.push(
            {
                pathname: "/friends/find-friends"
            }
        )
    }
    const [friends, setFriends] = useState([]);
    const fetchFriends = async (userId) => {
        try {
            const response = await fetch(`http://34.116.250.33:8080/api/friends/${userId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const errorText = await response.text(); // lub response.json() jeśli API zwraca JSON
            throw new Error(errorText || "Błąd pobierania znajomych");

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
                    <AddFriendButton onClick={handlePress} />
                    {friends.map((friend) => {
                        return (
                            <FriendComponent key={friend.id} onClickRemove={removeFriend} onClickCalendar={goToCalendar}
                                             friend={friend}/>)
                    })}
                </VStack>
            </ScrollView>
        </Box>

    )
};
export default FriendsScreen;