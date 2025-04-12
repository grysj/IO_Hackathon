import {Box, ButtonText, HStack, Pressable, Text} from "@gluestack-ui/themed";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, {useState} from "react";
import {Button} from "@gluestack-ui/themed";

const FriendsComponent = ({ onClickRemove, onClickCalendar, friend }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Box>
            <Pressable
                onPress={() => setExpanded(!expanded)}
                className={`rounded-lg p-3 border mb-3 flex-row items-center justify-between ${
                    expanded
                        ? 'bg-yellow-600 border-yellow-700'
                        : 'bg-background-100 border-outline-200'
                }`}
            >
                <Box className="flex-row items-center">
                    <Box className="mr-4">
                        <MaterialIcons name="person" size={30} color="white" />
                    </Box>
                    <Box>
                        <Text
                            className={`font-semibold ${
                                expanded ? 'text-white' : 'text-typography-900'
                            }`}
                        >
                            {friend.username}
                        </Text>
                        <Text
                            className={`text-xs ${
                                expanded ? 'text-yellow-100' : 'text-typography-500'
                            }`}
                        >
                            {friend.email}
                        </Text>
                    </Box>
                </Box>
                <MaterialIcons
                    name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color={expanded ? 'white' : '#aaa'}
                />
            </Pressable>

            {expanded && (
                <HStack className= "flex-1 flex-row gap-3 mb-3" >
                    <Button
                        onPress={() => onClickRemove(friend.id)}
                        className="bg-red-600 rounded-xl py-3 px-4 shadow-md flex-1"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ButtonText className="text-white font-semibold">Usuń znajomego</ButtonText>
                    </Button>
                    <Button
                        onPress={() => onClickCalendar(friend)}
                        className="bg-info-600 rounded-xl py-3 px-4 shadow-md flex-1"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ButtonText className="text-white font-semibold">Kalendarz</ButtonText>
                    </Button>
                </HStack>
            )}
        </Box>
    );
};

export default FriendsComponent;
