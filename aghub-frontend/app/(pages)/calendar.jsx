import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  ScrollView,
  Pressable,
} from "@gluestack-ui/themed";
import CalendarClass from "../../components/calendar/ClassesComponent";
import WeekDayBar from "../../components/calendar/WeekDayBar";
const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

const mockEvents = [
  {
    title: "PUMP",
    start: new Date("2025-04-12T10:00:00"),
    end: new Date("2025-04-12T12:00:00"),
    color: "bg-blue-600",
  },
  {
    title: "ZZZ",
    start: new Date("2025-04-12T22:00:00"),
    end: new Date("2025-04-13T05:00:00"),
    color: "bg-red-400",
    zIndex: 5,
  },
  {
    title: "YOGA",
    start: new Date("2025-04-12T08:30:00"),
    end: new Date("2025-04-12T09:30:00"),
    color: "bg-green-500",
  },
  {
    title: "FROM YESTERDAY",
    start: new Date("2025-04-11T23:00:00"),
    end: new Date("2025-04-12T03:00:00"),
    color: "bg-yellow-500",
  },
  {
    title: "TO TOMORROW",
    start: new Date("2025-04-12T23:00:00"),
    end: new Date("2025-04-13T01:00:00"),
    color: "bg-purple-500",
  },
  {
    title: "MONDAY MEETING",
    start: new Date("2025-04-14T09:00:00"),
    end: new Date("2025-04-14T10:00:00"),
    color: "bg-orange-500",
  },
];

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
  const [pickedDay, setPickedDay] = useState(new Date());
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [eventsPicked, setEventsPicked] = useState([]);
  useEffect(() => {
    console.log(pickedDay);
  }, []);
  useEffect(() => {
    console.log(weekDays);
  }, []);
  useEffect(() => {
    setEventsPicked(cropEventsToPickedDay(mockEvents, pickedDay));
    console.log(eventsPicked);
  }, [pickedDay]);

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
  const changePickedDay = (day) => {
    setPickedDay(day);
  };
  const shiftWeek = (direction) => {
    const newPicked = new Date(pickedDay);
    newPicked.setDate(pickedDay.getDate() + direction * 7);

    const newWeekDays = getWeekDays(newPicked);

    setPickedDay(newPicked);
    setWeekDays(newWeekDays);

    const cropped = cropEventsToPickedDay(mockEvents, newPicked);
    setEventsPicked(cropped);
  };
  const formatDate = (date) => {
    const string = date.toString().split(" ");
    return string[1] + " " + string[2] + " " + string[3];
  };

  return (
    <Box className="flex-1 bg-background-50">
      {/* Nagłówek */}
      <Box className="px-4 py-2 bg-background-50">
        <Text className="text-xl font-bold text-typography-950">
          {" "}
          {`${formatDate(weekDays[0])} - ${formatDate(weekDays[6])}`}
        </Text>
      </Box>

      <WeekDayBar
        weekDays={weekDays}
        pickedDay={pickedDay}
        onClickDay={changePickedDay}
        shift={shiftWeek}
      />
      <ScrollView className="mb-28">
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
        </Box>
      </ScrollView>
    </Box>
  );
};

export default CalendarScreen;
