import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";

const WeekDayBar = ({ weekDays, pickedDay, onClickDay, shift }) => {

    const isTheSameDay = (day1, day2) => {
        return (
            day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate()
        );
    };
    return (<HStack className="flex flex-row justify-between px-4 py-2 bg-background-200">
            <Pressable onPress={()=>shift(-1)}>
                <Box className="p-2">
                    <AntDesign name="left" size={24} color={"white"} />
                </Box>
            </Pressable >
            {weekDays.map((day, index) => (
                <Pressable key={index} onPress={() => onClickDay(day)}>
                    <Box
                        className={`w-8 h-8 mt-1 flex items-center justify-center align-middle ${
                            isTheSameDay(day, pickedDay) ? 'bg-yellow-600 rounded-full' : ''
                        }`}
                    >
                        <Text
                            className={`${
                                isTheSameDay(day, pickedDay)
                                    ? 'font-bold'
                                    : 'text-typography-900 font-normal'
                            }`}
                        >
                            {day.getDate()}
                        </Text>
                    </Box>
                </Pressable>

            ))}
            <Pressable onPress={()=>shift(1)}>
                <Box className="p-2">
                    <AntDesign name="right" size={24} color={"white"} />
                </Box>
            </Pressable>
        </HStack>
    )
};export default WeekDayBar;

