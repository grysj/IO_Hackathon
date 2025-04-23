import React, { useState } from "react";
import EventCreationCalendar from "./EventCreationCalendar";
import DateTimeRangePicker from "./DateTimeRangePicker";
import { useAuth } from "../../contexts/AuthContext";

//TODO Sprawdzić czy w friendsID jest user id

const EventAvailabilityPicker = ({ friendIds = [], onConfirm }) => {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState();
  const [availableSlots, setAvailableSlots] = useState([]);
  const { user } = useAuth();
  const usersId = [...friendIds, user.id];

  const handleConfirm = () => {
    if (selectedSlot) {
      if (selectedSlot?.dateStart < selectedSlot?.dateEnd) {
        onConfirm(selectedSlot);
      }
    }
  };

  return showCalendar ? (
    <EventCreationCalendar
      usersId={usersId}
      dateStart={dateStart}
      dateEnd={dateEnd}
      goBack={() => setShowCalendar(false)}
      availabilities={availableSlots}
      setSelectedSlot={setSelectedSlot}
      selectedSlot={selectedSlot}
      onConfirm={handleConfirm}
    />
  ) : (
    <DateTimeRangePicker
      dateStart={dateStart}
      setDateStart={setDateStart}
      dateEnd={dateEnd}
      setDateEnd={setDateEnd}
      setShowCalendar={setShowCalendar}
      availableSlots={availableSlots}
      setAvailableSlots={setAvailableSlots}
      usersId={usersId}
      setSelectedSlot={setSelectedSlot}
      selectedSlot={selectedSlot}
      onConfirm={handleConfirm}
      friendIds={friendIds}
    />
  );
};

export default EventAvailabilityPicker;
