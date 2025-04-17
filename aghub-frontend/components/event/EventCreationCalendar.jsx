import {cropScheduleToPickedDay, getWeekDays} from "../util/calendarUtils";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {formatDateTimeToLocalDateTime} from "../../app/functions/format/FormatDateTime";
import CalendarLabel from "../calendar/CalendarLabel";
import WeekDayBar from "../calendar/WeekDayBar";
import CalendarField from "../calendar/CalendarField";
import CalendarTimeLine from "../calendar/CalendarTimeLine";
import CalendarComponent from "../calendar/CalendarComponent";
import {TouchableOpacity, View} from "react-native";
import CalendarUsersActivitiesList from "./CalendarUsersActivitiesList";
import {Text} from "@gluestack-ui/themed";
import {Ionicons} from "@expo/vector-icons";

function filterHiddenUsers(usersCalendars = [], hiddenUsers = []) {
    return usersCalendars.filter(
        (entry) => !hiddenUsers.includes(entry?.user?.id)
    );
}

const generateSpecialDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
        days.push(new Date(current)); // kopia obiektu
        current.setDate(current.getDate() + 1);
    }

    return days;
};

const EventCreationCalendar= ({availabilities, dateStart, dateEnd, usersId, goBack}) =>{
    const { user } = useAuth();
    //TODO obsługa wyświetlania niedostępnych terminów po userze taka chcek lista z odznaczaniem userów
    const [hiddenUsers, setHiddenUsers] = useState([])
    const [usersCalendars, setUsersCalendars] = useState([])
    const [pickedDay, setPickedDay] = useState(new Date(dateStart));
    const [weekDays, setWeekDays] = useState(getWeekDays(new Date(dateStart)));
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
    const specialDays = generateSpecialDays(dateStart, dateEnd);
    const pickedCalendars = filterHiddenUsers(usersCalendars, hiddenUsers)
    const availabilitiesPicked = availabilities
        ? cropScheduleToPickedDay(availabilities, pickedDay)
        : [];
    return (
        <View className="flex-1  bg-background-50">
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding:4}}>
                <CalendarLabel dateStart={weekDays[0]} dateEnd={weekDays[6]} />

                <TouchableOpacity onPress={goBack} className="bg-yellow-600 px-3 py-2 rounded-lg" style={{ justifyContent: "center", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="arrow-back" size={15} color="white"  />
                        <Text className="text-white font-bold">Go Back</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <WeekDayBar
                weekDays={weekDays}
                pickedDay={pickedDay}
                onClickDay={setPickedDay}
                shift={shiftWeek}
                specialDays={specialDays}
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
                {availabilitiesPicked.map((entry, i)=>(
                    <CalendarComponent key={`avail-${i}`} backgroundColor={"#16a34a"} borderColor={"#14532d"} opacity={0.8} name={`Event slot ${i+1}`} {...entry}/>
                ))}
            </CalendarField>
        </View>
    );
};
export default EventCreationCalendar