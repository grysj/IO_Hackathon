package ki.agh.aghub.dto;

import java.util.List;

public class FourthEndpointDTO {

    private List<EventDTO> acceptedEvents;
    private List<EventDTO> declinedEvents;
    private List<EventDTO> pendingEvents;

    public FourthEndpointDTO(
        List<EventDTO> acceptedEvents, 
        List<EventDTO> declinedEvents, 
        List<EventDTO> pendingEvents
    ) {
        this.acceptedEvents = acceptedEvents;
        this.declinedEvents = declinedEvents;
        this.pendingEvents = pendingEvents;
    }

    public List<EventDTO> getAcceptedEvents() {
        return acceptedEvents;
    }

    public void setAcceptedEvents(List<EventDTO> acceptedEvents) {
        this.acceptedEvents = acceptedEvents;
    }

    public List<EventDTO> getDeclinedEvents() {
        return declinedEvents;
    }

    public void setDeclinedEvents(List<EventDTO> declinedEvents) {
        this.declinedEvents = declinedEvents;
    }

    public List<EventDTO> getPendingEvents() {
        return pendingEvents;
    }

    public void setPendingEvents(List<EventDTO> pendingEvents) {
        this.pendingEvents = pendingEvents;
    }
}
