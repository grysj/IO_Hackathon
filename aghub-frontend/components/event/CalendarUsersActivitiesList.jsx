import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import CalendarComponent from "../calendar/CalendarComponent";
import { cropScheduleToPickedDay } from "../util/calendarUtils";

const CalendarUsersActivitiesList = ({ schedule, pickedDay, user }) => {
    const router = useRouter();

    const classesPicked = schedule?.classes
        ? cropScheduleToPickedDay(schedule.classes, pickedDay)
        : [];
    const eventsPicked = schedule?.events
        ? cropScheduleToPickedDay(schedule.events, pickedDay)
        : [];
    const unavailabilityPicked = schedule?.unavailability
        ? cropScheduleToPickedDay(schedule.unavailability, pickedDay)
        : [];
//TODO po zrobieniu wszystkiego w CalendarComponent można
// tu przekazywać parametry styleC styleE styleU i on press żeby użyć to w
// EventCreationCalendar i w zwykłym calendar zle to już taki refactor pod clean code

    return (
        <>
            {classesPicked.map((c, i) => (
                <CalendarComponent
                    key={`class-${i}`}
                    {...c}
                    color="bg-red-600"
                    borderColor="bg-red-600"
                    zIndex={9}
                    type="class"
                    showDate={false}
                />
            ))}

            {eventsPicked.map((e, i) => (
                <CalendarComponent
                    key={`event-${i}`}
                    {...e}
                    color="bg-red-600"
                    type="event"
                    borderColor="bg-red-600"
                    opacity={0.1}
                    showDate={false}
                />
            ))}

            {unavailabilityPicked.map((u, i) => (
                <CalendarComponent
                    key={`unavail-${i}`}
                    {...u}
                    color="bg-red-600"
                    opacity={0.1}
                    borderColor="bg-red-600"
                    zIndex={8}
                    type="unavailability"
                    showDate={false}
                />
            ))}
        </>
    );
};

export default CalendarUsersActivitiesList;
