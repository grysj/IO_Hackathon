import {cropScheduleToPickedDay, getWeekDays} from "../util/calendarUtils";
import {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {formatDateTimeToLocalDateTime} from "../../app/functions/format/FormatDateTime";
import CalendarLabel from "../calendar/CalendarLabel";
import WeekDayBar from "../calendar/WeekDayBar";
import CalendarField from "../calendar/CalendarField";
import CalendarTimeLine from "../calendar/CalendarTimeLine";
import CalendarComponent from "../calendar/CalendarComponent";
import {View} from "react-native";
import CalendarUsersActivitiesList from "./CalendarUsersActivitiesList";

function filterHiddenUsers(usersCalendars = [], hiddenUsers = []) {
    return usersCalendars.filter(
        (entry) => !hiddenUsers.includes(entry?.user?.id)
    );
}



const EventCreationCalendar= ({availabilities, dateStart, dateEnd, usersId}) =>{
    const { user } = useAuth();
    const [hiddenUsers, setHiddenUsers] = useState([])
    const [usersCalendars, setUsersCalendars] = useState([])
    const [pickedDay, setPickedDay] = useState(new Date(dateStart));
    const [weekDays, setWeekDays] = useState(getWeekDays());
    const [error, setError] = useState(null);


    const shiftWeek = (direction) => {
        const newPicked = new Date(pickedDay);
        newPicked.setDate(pickedDay.getDate() + direction * 7);

        const newWeekDays = getWeekDays(newPicked);
        setPickedDay(newPicked);
        setWeekDays(newWeekDays);
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchUsersSchedule = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch("http://34.116.250.33:8080/api/schedule/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usersId: usersId,
                        dateStart: formatDateTimeToLocalDateTime(dateStart),
                        dateEnd: formatDateTimeToLocalDateTime(dateEnd),
                    }),
                    signal: controller.signal,
                });

                if (!response.ok) throw new Error("Failed to fetch schedule");

                const data = await response.json();
                setUsersCalendars(data)
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    console.error(err);
                }
            }
        };

        fetchUsersSchedule();

        return () => controller.abort();
    }, [user, weekDays]);
    const pickedCalendars = filterHiddenUsers(usersCalendars, hiddenUsers)

    return (
        <View className="flex-1 bg-background-50">
            <CalendarLabel dateStart={weekDays[0]} dateEnd={weekDays[6]}/>

            <WeekDayBar
                weekDays={weekDays}
                pickedDay={pickedDay}
                onClickDay={setPickedDay}
                shift={shiftWeek}
            />

            <CalendarField>
                <CalendarTimeLine/>
                {pickedCalendars.map((entry, i) => (
                    <CalendarUsersActivitiesList
                        key={`user-${entry.user.id}-${i}`}
                        user={entry.user}
                        pickedDay={pickedDay}
                        schedule={entry.calendar}
                    />
                ))}
                {availabilities.map((entry, i)=>(
                    <CalendarComponent key={`avail-${entry.id}`} opacity={0.8} {...entry}/>
                ))}
            </CalendarField>
        </View>
    );
};
export default EventCreationCalendar