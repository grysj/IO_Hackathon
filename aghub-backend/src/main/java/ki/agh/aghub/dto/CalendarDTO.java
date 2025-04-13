package ki.agh.aghub.dto;

import java.util.List;

public record CalendarDTO(
    List<EventDTO> events,
    List<ClassesDTO> classes,
    List<UnavailabilityDTO> unavailability
) {

    public static CalendarDTO fromEventsClassesAndUnavailability(
        List<EventDTO> events,
        List<ClassesDTO> classes,
        List<UnavailabilityDTO> unavailability
    ) {
        return new CalendarDTO(events, classes, unavailability);
    }
}
