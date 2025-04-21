import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import {getWeekDays, isTheSameDay} from "../util/calendarUtils";
//TODO poprawienie tego parszywego stylowania i wywalenie gluestacka as usuall
const WeekDayBar = ({ weekDays, pickedDay, onClickDay, setWeekDays, specialDays =[] }) => {

    const isSpecialDay = (day2)=>{
        return specialDays.some(day1 => isTheSameDay(day1,day2))
    }
    const shiftWeek = (direction) => {
        const newPicked = new Date(pickedDay);
        newPicked.setDate(pickedDay.getDate() + direction * 7);

        const newWeekDays = getWeekDays(newPicked);
        if (direction === -1){
            onClickDay(newWeekDays[6]);
        }else{
            onClickDay(newWeekDays[0])
        }

        setWeekDays(newWeekDays);
    };
    return (<HStack className="flex flex-row justify-between px-4 py-2 bg-background-200">
            <Pressable onPress={()=>shiftWeek(-1)}>
                <Box className="p-2">
                    <AntDesign name="left" size={24} color={"white"} />
                </Box>
            </Pressable >
            {weekDays.map((day, index) => (
                <Pressable key={index} onPress={() => onClickDay(day)}>
                    <Box
                        className={`w-8 h-8 mt-1 flex items-center justify-center align-middle ${
                            isTheSameDay(day, pickedDay) ? 'bg-yellow-600 rounded-full' : 
                                isSpecialDay(day) ? "bg-green-500 rounded-full" :""}
                             ${isTheSameDay(day, pickedDay)&& isSpecialDay(day)?"border-2 border-green-500":""}`}
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
            <Pressable onPress={()=>shiftWeek(1)}>
                <Box className="p-2">
                    <AntDesign name="right" size={24} color={"white"} />
                </Box>
            </Pressable>
        </HStack>
    )
};export default WeekDayBar;

