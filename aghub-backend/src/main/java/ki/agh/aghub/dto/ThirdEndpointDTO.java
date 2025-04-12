package ki.agh.aghub.dto;

import java.util.List;

public class ThirdEndpointDTO {

    private List<EventDTO> events;

    private List<ClassesDTO> classes;

    private List<UnavailabilityDTO> unavailability;

    public ThirdEndpointDTO(List<EventDTO> events, List<ClassesDTO> classes, List<UnavailabilityDTO> unavailability) {
        this.events = events;
        this.classes = classes;
        this.unavailability = unavailability;
    }

    public List<EventDTO> getEvents() {
        return events;
    }

    public void setEvents(List<EventDTO> events) {
        this.events = events;
    }

    public List<ClassesDTO> getClasses() {
        return classes;
    }

    public void setClasses(List<ClassesDTO> classes) {
        this.classes = classes;
    }

    public List<UnavailabilityDTO> getUnavailability() {
        return unavailability;
    }

    public void setUnavailability(List<UnavailabilityDTO> unavailability) {
        this.unavailability = unavailability;
    }
}
