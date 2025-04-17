import React, {useEffect, useState} from "react";
import {Box, Text} from "@gluestack-ui/themed";
import CalendarComponent from "./CalendarComponent";
import WeekDayBar from "./WeekDayBar";
import {useRouter} from "expo-router";
import CalendarTimeLine from "./CalendarTimeLine";
import { formatDateTimeToLocalDateTime} from "../../app/functions/format/FormatDateTime";
import CalendarField from "./CalendarField";

import CalendarLabel from "./CalendarLabel";
import {cropScheduleToPickedDay, getWeekDays} from "../util/calendarUtils";







const Calendar = ({user}) => {
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
            <CalendarLabel dateStart={weekDays[0]} dateEnd={weekDays[6]}/>

            <WeekDayBar
                weekDays={weekDays}
                pickedDay={pickedDay}
                onClickDay={setPickedDay}
                shift={shiftWeek}
            />

            <CalendarField>
                <CalendarTimeLine/>

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
                                params: {id: c.id},
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
                                params: {id: e.id},
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
            </CalendarField>
        </Box>
    );
};

export default Calendar;
