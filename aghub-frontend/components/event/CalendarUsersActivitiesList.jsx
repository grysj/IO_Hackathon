import React from "react";
import {useRouter} from "expo-router";
import CalendarComponent from "../calendar/CalendarComponent";
import {cropScheduleToPickedDay} from "../util/calendarUtils";

const CalendarUsersActivitiesList = ({schedule, pickedDay, user}) => {
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
                    key={`class-${i}-${user?.id}`}
                    {...c}
                    backgroundColor={"#991b1b"}
                    borderColor={"#dc2626"}
                    opacity={0.2}
                    zIndex={9}
                    type="class"
                    showDate={false}
                    username={user.username}
                />
            ))}

            {eventsPicked.map((e, i) => (
                <CalendarComponent
                    key={`event-${i}-${user?.id}`}
                    {...e}
                    backgroundColor={"#991b1b"}
                    type="event"
                    borderColor={"#dc2626"}
                    username={user.username}
                    opacity={0.2}
                />
            ))}

            {unavailabilityPicked.map((u, i) => (
                <CalendarComponent
                    key={`unavail-${i}-${user?.id}`}
                    {...u}
                    backgroundColor={"#991b1b"}
                    opacity={0.2}
                    borderColor={"#dc2626"}
                    zIndex={8}
                    username={user.username}
                    type="unavailability"
                />
            ))}
        </>
    )
};

export default CalendarUsersActivitiesList;
