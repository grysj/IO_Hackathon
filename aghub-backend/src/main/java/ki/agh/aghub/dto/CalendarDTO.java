package ki.agh.aghub.dto;

import java.util.List;

public record CalendarDTO(
    List<EventDTO> events,
    List<ClassesDTO> classes,
    List<UnavailabilityDTO> unavailability
) {
}
