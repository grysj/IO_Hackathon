package ki.agh.aghub.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventByTypeDTO {

    private List<EventDTO> acceptedEvents;
    private List<EventDTO> declinedEvents;
    private List<EventDTO> pendingEvents;

    public EventByTypeDTO(List<EventsDTO> acceptedEvents, List<EventsDTO> declinedEvents, List<EventsDTO> pendingEvents) {
        this.acceptedEvents = acceptedEvents;
        this.declinedEvents = declinedEvents;
        this.pendingEvents = pendingEvents;
    }

    public void setAcceptedEvents(List<EventsDTO> acceptedEvents) {
        this.acceptedEvents = acceptedEvents;
    }

    public void setDeclinedEvents(List<EventsDTO> declinedEvents) {
        this.declinedEvents = declinedEvents;
    }

    public void setPendingEvents(List<EventsDTO> pendingEvents) {
        this.pendingEvents = pendingEvents;
    }
}
