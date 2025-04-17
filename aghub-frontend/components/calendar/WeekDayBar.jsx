import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
//TODO poprawienie tego parszywego stylowania i wywalenie gluestacka as usuall
const WeekDayBar = ({ weekDays, pickedDay, onClickDay, shift, specialDays =[] }) => {

    const isTheSameDay = (day1, day2) => {
        return (
            day1.getFullYear() === day2.getFullYear() &&
            day1.getMonth() === day2.getMonth() &&
            day1.getDate() === day2.getDate()
        );
    };
    const isSpecialDay = (day2)=>{
        return specialDays.some(day1 => isTheSameDay(day1,day2))
    }
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
                            isTheSameDay(day, pickedDay) ? 'bg-yellow-600 rounded-full' : 
                                isSpecialDay(day) ? "bg-green-500 rounded-full border-2 border-green-700" :""}
                             ${isTheSameDay(day, pickedDay)&& isSpecialDay(day)?"border-2 border-green-700":""}`}
                    >
                        <Text
                            className={`${
                                isTheSameDay(day, pickedDay) || isSpecialDay(day)
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

