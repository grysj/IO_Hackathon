import React, {useEffect, useState} from 'react';
import { Box, VStack, HStack, Text, ScrollView, Pressable } from '@gluestack-ui/themed';
import CalendarClass from "../../components/calendar/ClassesComponent";
import WeekDayBar from "../../components/calendar/WeekDayBar";
import {mockEvents} from "../../mock/MockedData";

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);







const CalendarScreen = () => {
    const getWeekDays = (referenceDate = new Date()) => {
        const day = referenceDate.getDay();
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(referenceDate);
        monday.setDate(referenceDate.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        return Array.from({ length: 7 }, (_, i) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            return date;
        });
    };
    const [pickedDay, setPickedDay] = useState(new Date);
    const [weekDays, setWeekDays] = useState(getWeekDays());
    const [eventsPicked, setEventsPicked] = useState([])
    useEffect(() => {
        console.log(pickedDay)
    }, []);
    useEffect(()=>{
        console.log(weekDays)
    },[])
    useEffect(()=>{
        setEventsPicked(cropEventsToPickedDay(mockEvents, pickedDay))
        console.log(eventsPicked)
    },[pickedDay])


    const cropEventsToPickedDay = (events, pickedDay) => {
        const startOfDay = new Date(pickedDay);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(pickedDay);
        endOfDay.setHours(23, 59, 59, 999);

        return events
            .filter((e) => e.end >= startOfDay && e.start <= endOfDay)
            .map((e) => {
                const start = e.start < startOfDay ? startOfDay : e.start;
                const end = e.end > endOfDay ? endOfDay : e.end;
                return { ...e, start, end };
            });
    };
    const changePickedDay=(day)=>{
        setPickedDay(day)
    }
    const shiftWeek = (direction) => {
        const newPicked = new Date(pickedDay);
        newPicked.setDate(pickedDay.getDate() + direction * 7)

        const newWeekDays = getWeekDays(newPicked);

        setPickedDay(newPicked);
        setWeekDays(newWeekDays);


        const cropped = cropEventsToPickedDay(mockEvents, newPicked);
        setEventsPicked(cropped);
    };
    const formatDate=(date)=>{
        const string = date.toString().split(" ")
        return string[1]+" "+string[2]+" "+string[3]
    }


    return (
        <Box className="flex-1 bg-background-50">
            {/* Nagłówek */}
            <Box className="px-4 py-2 bg-background-50">
                <Text className="text-xl font-bold text-typography-950">  {`${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`}
                </Text>
            </Box>


            <WeekDayBar weekDays={weekDays} pickedDay={pickedDay} onClickDay={changePickedDay} shift={shiftWeek}/>
            <ScrollView>
                <Box className="px-4 py-2 min-h-[1440px] relative">
                    {hours.map((hour, i) => (
                        <HStack
                            key={i}
                            className="items-start h-[60px] border-t border-outline-200"
                        >
                            <Text className="text-xs w-[50px] text-typography-500">
                                {hour}
                            </Text>
                        </HStack>
                    ))}

                    {/* Event: PUMP */}
                    {eventsPicked.map((event, i) => (
                        <CalendarClass key={i} {...event} />
                    ))}


                    {/* Event: ZZZ */}
                    {/*<Box*/}
                    {/*    className="absolute left-[60px] w-[85%] h-[420px] bg-error-400 opacity-20 rounded-md px-2 py-1 z-5"*/}
                    {/*    style={{top: 22 * 60}}*/}
                    {/*>*/}
                    {/*    <Text className="text-typography-700 font-medium">ZZZ</Text>*/}
                    {/*</Box>*/}
                </Box>
            </ScrollView>
        </Box>
    );
};

export default CalendarScreen;
