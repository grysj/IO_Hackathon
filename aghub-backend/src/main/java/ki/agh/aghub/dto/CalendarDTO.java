package ki.agh.aghub.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class CalendarDTO {

    private List<EventsDTO> events;

    private List<ClassesDTO> classes;

    private List<UnavailabilityDTO> unavailability;

    public CalendarDTO(List<EventsDTO> events, List<ClassesDTO> classes, List<UnavailabilityDTO> unavailability) {
        this.events = events;
        this.classes = classes;
        this.unavailability = unavailability;
    }

}
