import React, { useEffect, useState } from 'react';
import { Box, Text, ScrollView, HStack } from '@gluestack-ui/themed';
import CalendarComponent from './CalendarComponent';
import WeekDayBar from './WeekDayBar';
import { mockSchedule } from '../../mock/MockedData';

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
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
const Calendar = ({ user }) => {
    const [schedule, setSchedule ] = useState(null)
    const [pickedDay, setPickedDay] = useState(new Date());
    const [weekDays, setWeekDays] = useState(getWeekDays());
    const [classesPicked, setClassesPicked] = useState([]);
    const [eventsPicked, setEventsPicked] = useState([]);
    const [unavailabilityPicked, setUnavailabilityPicked] = useState([]);
    const fetchSchedule = async (userId, startDate, endDate) => {
        // Zakomentowany przykład requestu:


        try {
          const response = await fetch('http://34.116.250.33:8080/api/schedule', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: userId,
              startDate: startDate.toISOString(),
              endDate: new Date(endDate).toISOString(),
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch schedule');
          }

          const data = await response.json(); // Zakładamy, że data = { events: [], classes: [], unavailability: [] }
          setSchedule(data);
        } catch (error) {
          console.error('Error fetching schedule:', error);
        }


        // Tymczasowo używamy mocka
        //setSchedule(mockSchedule)
    }
    const getSchedule = (userId) =>{
        const startDate = weekDays[0]
        const endDate = new Date(weekDays[6]);
        endDate.setHours(23, 59, 59, 999);
        fetchSchedule(userId, startDate, endDate)
    }
    useEffect(() => {
        if (user?.id) {
            getSchedule(user.id);
        }
    }, [user, weekDays]);




    const cropScheduleToPickedDay = (schedule, pickedDay) => {
        const startOfDay = new Date(pickedDay);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(pickedDay);
        endOfDay.setHours(23, 59, 59, 999);

        return schedule
            .filter((e) => e.endDate >= startOfDay && e.startDate <= endOfDay)
            .map((e) => {
                const startDate = e.startDate < startOfDay ? startOfDay : e.startDate;
                const endDate = e.endDate > endOfDay ? endOfDay : e.endDate;
                return { ...e, startDate, endDate };
            });
    };

    const changePickedDay = (day) => {
        setPickedDay(day);
    };

    const shiftWeek = (direction) => {
        const newPicked = new Date(pickedDay);
        newPicked.setDate(pickedDay.getDate() + direction * 7);

        const newWeekDays = getWeekDays(newPicked);
        setPickedDay(newPicked);
        setWeekDays(newWeekDays);

        if (!schedule) return;

        setClassesPicked(cropScheduleToPickedDay(schedule.classes || [], newPicked));
        setEventsPicked(cropScheduleToPickedDay(schedule.events || [], newPicked));
        setUnavailabilityPicked(cropScheduleToPickedDay(schedule.unavailability || [], newPicked));
    };


    const formatDate = (date) => {
        const string = date.toString().split(' ');
        return string[1] + ' ' + string[2] + ' ' + string[3];
    };

    useEffect(() => {
        if (!schedule) return;

        setClassesPicked(cropScheduleToPickedDay(schedule.classes || [], pickedDay));
        setEventsPicked(cropScheduleToPickedDay(schedule.events || [], pickedDay));
        setUnavailabilityPicked(cropScheduleToPickedDay(schedule.unavailability || [], pickedDay));
    }, [pickedDay, schedule]);

    return (
        <Box className="flex-1 bg-background-50 ">
            {/* Nagłówek */}
            <Box className="px-4 py-2 bg-background-50">
                <Text className="text-xl font-bold text-typography-950">
                    {`${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`}
                </Text>
            </Box>

            <WeekDayBar
                weekDays={weekDays}
                pickedDay={pickedDay}
                onClickDay={changePickedDay}
                shift={shiftWeek}
            />

            <ScrollView>
                <Box className="px-4 py-2 min-h-[1440px] ">
                    {hours.map((hour, i) => (
                        <HStack
                            key={i}
                            className="items-start h-[60px] border-t border-outline-200"
                        >
                            <Text className="text-xs w-[50px] text-typography-500">{hour}</Text>
                        </HStack>
                    ))}

                    {classesPicked.map((c, i) => (
                        <CalendarComponent key={`class-${i}`} {...c} color="bg-info-400" zIndex={9} type="class" />
                    ))}
                    {eventsPicked.map((e, i) => (
                        <CalendarComponent key={`event-${i}`} {...e} color="bg-success-500" type="event" />
                    ))}
                    {unavailabilityPicked.map((u, i) => (
                        <CalendarComponent key={`unavail-${i}`} {...u} color="bg-red-600" zIndex={8} type="unavailability" />
                    ))}
                </Box>

            </ScrollView>
        </Box>
    );
};

export default Calendar;
