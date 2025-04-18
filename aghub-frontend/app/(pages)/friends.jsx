import React, {useContext, useEffect, useState} from 'react';
import {Box, ScrollView, VStack, Text, View} from '@gluestack-ui/themed'


import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";

import FriendComponent from "../../components/friendlist/FriendComponent";
import AddFriendButton from "../../components/friendlist/AddFriendButton";
import Divider from "../../components/ui/Divider";




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
            if(!response.ok){
                const errorText = await response.json(); // lub response.json() jeśli API zwraca JSON
                throw new Error(errorText || "Błąd pobierania znajomych");
            }

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
            <View justifyContent="space-between" className="flex-row ">
                <Text className="text-white mt-2 text-lg px-4 py-2 font-semibold">
                    Friends list:
                </Text>
                <AddFriendButton onClick={handlePress} />
            </View>
            <Divider marginHorizontal={4}/>
            <ScrollView>
                <VStack space="md" className={"p-3"}>

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