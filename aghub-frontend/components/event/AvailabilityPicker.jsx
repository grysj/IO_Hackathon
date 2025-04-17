import React, {useState} from "react";
import EventCreationCalendar from "./EventCreationCalendar";
import DateTimeRangePicker from "./DateTimeRangePicker";


//TODO Sprawdzić czy w friendsID jest user id


const AvailabilityPicker = ({friendIds = [], onConfirm}) => {

    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())

    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState()
    const [availableSlots, setAvailableSlots] = useState([])


    const handleConfirm = () => {
        if (selectedSlot) {
            onConfirm(selectedSlot);
        }
    };

    return showCalendar ? (
        <EventCreationCalendar usersId={friendIds}
                               dateStart={dateStart}
                               dateEnd={dateEnd}
                               goBack={() => setShowCalendar(false)}
                               availabilities={availableSlots}/>

    ) : (<DateTimeRangePicker dateStart={dateStart}
                              setDateStart={setDateStart}
                              dateEnd={dateEnd}
                              setDateEnd={setDateEnd}
                              setShowCalendar={setShowCalendar}
                              availableSlots={availableSlots}
                              setAvailableSlots={setAvailableSlots}
                              friendIds={friendIds}
                              setSelectedSlot={selectedSlot}
                              selectedSlot={selectedSlot}

        />
    );
};

export default AvailabilityPicker;
