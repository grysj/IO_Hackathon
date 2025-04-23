
import {cropScheduleToPickedDay, getWeekDays} from "../util/calendarUtils";
import React, {useState} from "react";
import {useAuth} from "../../contexts/AuthContext";
import {formatDateTimeToLocalDateTime} from "../../util/format/FormatDateTime";
import CalendarLabel from "../calendar/CalendarLabel";
import WeekDayBar from "../calendar/WeekDayBar";
import CalendarField from "../calendar/CalendarField";
import CalendarTimeLine from "../calendar/CalendarTimeLine";
import CalendarComponent from "../calendar/CalendarComponent";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CalendarUsersActivitiesList from "./CalendarUsersActivitiesList";
import {Ionicons} from "@expo/vector-icons";
import EventSlotCustomizer from "./EventSlotCustomizer";
import PageView from "../ui/PageView";
import PageButton from "../ui/PageButton";
import { useQuery } from "@tanstack/react-query";
import { getUsersSchedules } from "../../api/aghub";

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
  const [showSchedule, setShowSchedule] = useState(false);

  while (current <= endDate) {
    days.push(new Date(current)); // kopia obiektu
    current.setDate(current.getDate() + 1);
  }

  return days;
};

const EventCreationCalendar = ({
                                   availabilities,
                                   dateStart,
                                   dateEnd,
                                   usersId,
                                   goBack,
                                   selectedSlot,
                                   setSelectedSlot,
                                   onConfirm
                               }) => {
    const {user} = useAuth();
    //TODO obsługa wyświetlania niedostępnych terminów po userze taka chcek lista z odznaczaniem userów
    const [hiddenUsers, setHiddenUsers] = useState([])
    const [pickedDay, setPickedDay] = useState(new Date(selectedSlot.dateStart));
    const [weekDays, setWeekDays] = useState(getWeekDays(new Date(dateStart)));
    const [error, setError] = useState(null);
    const [showSlotCustomizer, setShowSlotCustomizer] = useState(false)






  const {
    data: usersCalendars,
    isLoading: isUsersCalendarsLoading,
    error: usersCalendarsError,
  } = useQuery({
    queryKey: ["usersCalendars", usersId.slice().sort(), dateStart, dateEnd],
    queryFn: ({ signal }) =>
      getUsersSchedules(
        usersId,
        formatDateTimeToLocalDateTime(dateStart),
        formatDateTimeToLocalDateTime(dateEnd),
        signal
      ),
    enabled: !!user?.id,
  });

  const specialDays = generateSpecialDays(dateStart, dateEnd);
  const pickedCalendars = filterHiddenUsers(usersCalendars, hiddenUsers);
  const availabilitiesPicked = availabilities
    ? cropScheduleToPickedDay(availabilities, pickedDay)
    : [];
  const selectedSlotPicked =
    selectedSlot && selectedSlot?.dateStart < selectedSlot?.dateEnd
      ? cropScheduleToPickedDay([selectedSlot], pickedDay)
      : [];

    return (
        <PageView>
            <View style={styles.header}>
                <CalendarLabel dateStart={weekDays[0]} dateEnd={weekDays[6]}/>

                <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                    <View style={styles.goBackInner}>
                        <Ionicons name="arrow-back" size={15} color="white"/>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </View>
                </TouchableOpacity>
            </View>


            <WeekDayBar
                weekDays={weekDays}
                pickedDay={pickedDay}
                onClickDay={setPickedDay}
                setWeekDays={setWeekDays}
                specialDays={specialDays}
            />
            {showSlotCustomizer ? (
                <View>
                    <EventSlotCustomizer
                        dateMin={dateStart}
                        dateMax={dateEnd}
                        selectedSlot={selectedSlot}
                        setSelectedSlot={setSelectedSlot}
                        onConfirm={onConfirm}
                    />
                    <TouchableOpacity onPress={() => setShowSlotCustomizer(false)} style={styles.slotToggle}>
                        <Ionicons name="chevron-up-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.slotToggleWrapper}>
                    <PageButton onPress={() => setShowSlotCustomizer(true)} title="Customize Event Time" />
                </View>
            )}

            <CalendarField>
                <CalendarTimeLine/>
                {pickedCalendars.map((entry, i) => (<CalendarUsersActivitiesList
                    key={`user-${entry.user.id}-${i}`}
                    user={entry.user}
                    pickedDay={pickedDay}
                    schedule={entry.calendar}
                />))}
                {availabilitiesPicked.map((entry, i) => (
                    <CalendarComponent key={`avail-${i}`} backgroundColor={"#16a34a"} borderColor={"#14532d"}
                                       opacity={0.8} name={`Event slot ${i + 1}`} {...entry}/>))}
                {selectedSlotPicked.map((entry, i) => (
                    <CalendarComponent key={`slot-${i}`} backgroundColor={"#2563eb"} borderColor={"#1e3a8a"}
                                       opacity={0.4} name={`Picked slot`} {...entry}
                                       side={"right"}
                                       style={{alignItems: "flex-end"}}
                    />))}
            </CalendarField>
        </PageView>
    );
};
export default EventCreationCalendar

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingRight: 8
    },
    goBackButton: {
        backgroundColor: "#ca8a04", // bg-yellow-600
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    goBackInner: {
        flexDirection: "row",
        alignItems: "center",
    },
    goBackText: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 4,
    },
    slotToggle: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "white",
        paddingVertical: 8,
    },
    slotToggleWrapper: {
        borderBottomWidth: 2,
        borderColor: "white",
        padding: 8,
    },
});
