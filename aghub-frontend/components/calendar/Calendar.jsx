import React, { useEffect, useState } from "react";
import { Box, HStack, ScrollView, Text } from "@gluestack-ui/themed";
import CalendarComponent from "./CalendarComponent";
import WeekDayBar from "./WeekDayBar";
import { useRouter } from "expo-router";
import CalendarTimeLine from "./CalendarTimeLine";
import {
  formatDateTimeToLocalDateTime,
  formatDateLabel,
} from "@/util/format/FormatDateTime";

const hours = Array.from(
  { length: 24 },
  (_, i) => `${i.toString().padStart(2, "0")}:00`
);

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

const cropScheduleToPickedDay = (items, pickedDay) => {
  const startOfDay = new Date(pickedDay);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(pickedDay);
  endOfDay.setHours(23, 59, 59, 999);

  return items
    .filter(
      (item) =>
        new Date(item.dateEnd) >= startOfDay &&
        new Date(item.dateStart) <= endOfDay
      // Should be dateEnd?
    )
    .map((item) => ({
      ...item,
      dateStart: new Date(Math.max(new Date(item.dateStart), startOfDay)),
      dateEnd: new Date(Math.min(new Date(item.dateEnd), endOfDay)),
    }));
};

const Calendar = ({ user }) => {
  const [schedule, setSchedule] = useState(null);
  const [pickedDay, setPickedDay] = useState(new Date());
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const [error, setError] = useState(null);
  const router = useRouter();

  const shiftWeek = (direction) => {
    const newPicked = new Date(pickedDay);
    newPicked.setDate(pickedDay.getDate() + direction * 7);

    const newWeekDays = getWeekDays(newPicked);
    setPickedDay(newPicked);
    setWeekDays(newWeekDays);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchSchedule = async () => {
      if (!user?.id) return;

      const dateStart = weekDays[0];
      const dateEnd = new Date(weekDays[6]);
      dateEnd.setHours(23, 59, 59, 999);

      try {
        const response = await fetch("http://34.116.250.33:8080/api/schedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            dateStart: formatDateTimeToLocalDateTime(dateStart),
            dateEnd: formatDateTimeToLocalDateTime(dateEnd),
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Failed to fetch schedule");

        const data = await response.json();
        setSchedule(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.error(err);
        }
      }
    };

    fetchSchedule();

    return () => controller.abort();
  }, [user, weekDays]);

  const classesPicked = schedule?.classes
    ? cropScheduleToPickedDay(schedule.classes, pickedDay)
    : [];
  const eventsPicked = schedule?.events
    ? cropScheduleToPickedDay(schedule.events, pickedDay)
    : [];
  const unavailabilityPicked = schedule?.unavailability
    ? cropScheduleToPickedDay(schedule.unavailability, pickedDay)
    : [];

  return (
    <Box className="flex-1 bg-background-50">
      <Box className="px-4 py-2 bg-background-50">
        <Text className="text-xl font-bold text-typography-950">
          {`${formatDateLabel(weekDays[0])} - ${formatDateLabel(weekDays[6])}`}
        </Text>
      </Box>

      <WeekDayBar
        weekDays={weekDays}
        pickedDay={pickedDay}
        onClickDay={setPickedDay}
        shift={shiftWeek}
      />

      <ScrollView>
        <CalendarTimeLine />
        <Box className="px-4 py-2 min-h-[1440px]">
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

          {classesPicked.map((c, i) => (
            <CalendarComponent
              key={`class-${i}`}
              {...c}
              color="bg-info-400"
              zIndex={9}
              type="class"
              onPress={() =>
                router.push({
                  pathname: "/classes/[id]",
                  params: { id: c.id },
                })
              }
            />
          ))}
          {eventsPicked.map((e, i) => (
            <CalendarComponent
              key={`event-${i}`}
              {...e}
              color="bg-success-500"
              type="event"
              borderColor="bg-succes-600"
              opacity={0.6}
              onPress={() =>
                router.push({
                  pathname: "/events/[id]",
                  params: { id: e.id },
                })
              }
            />
          ))}
          {unavailabilityPicked.map((u, i) => (
            <CalendarComponent
              key={`unavail-${i}`}
              {...u}
              color="bg-red-600"
              opacity={0.4}
              borderColor="bg-red-600"
              zIndex={8}
              type="unavailability"
            />
          ))}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Calendar;
