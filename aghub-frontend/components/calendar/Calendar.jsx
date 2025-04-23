import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import WeekDayBar from "./WeekDayBar";
import { useRouter } from "expo-router";
import CalendarTimeLine from "./CalendarTimeLine";
import { formatDateTimeToLocalDateTime } from "@/util/format/FormatDateTime";
import CalendarField from "./CalendarField";
import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "@/api/aghub";
import CalendarLabel from "./CalendarLabel";
import { cropScheduleToPickedDay, getWeekDays } from "../util/calendarUtils";
import PageView from "../ui/PageView";

const Calendar = ({ user }) => {
  const [pickedDay, setPickedDay] = useState(new Date());
  const router = useRouter();


  const weekDays = getWeekDays(pickedDay);



  const { data: schedule } = useQuery({
    queryKey: ["schedule", user?.id, pickedDay.toISOString()],
    queryFn: async () => {
      const dateStart = weekDays[0];
      const dateEnd = new Date(weekDays[6]);
      dateEnd.setHours(23, 59, 59, 999);

      return getSchedule(
        user.id,
        formatDateTimeToLocalDateTime(dateStart),
        formatDateTimeToLocalDateTime(dateEnd)
      );
    },
    enabled: !!user?.id,
  });

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
    <PageView>
      <CalendarLabel dateStart={weekDays[0]} dateEnd={weekDays[6]} />

      <WeekDayBar
        weekDays={weekDays}
        pickedDay={pickedDay}
        onClickDay={setPickedDay}
      />

      <CalendarField>
        <CalendarTimeLine />

        {classesPicked.map((c, i) => (
          <CalendarComponent
            key={`class-${i}`}
            {...c}
            backgroundColor="#3b82f6"
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
            backgroundColor="#ff0000"
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
            backgroundColor="bg-red-600"
            opacity={0.4}
            borderColor="bg-red-600"
            zIndex={8}
            type="unavailability"
          />
        ))}
      </CalendarField>
    </PageView>
  );
};

export default Calendar;
