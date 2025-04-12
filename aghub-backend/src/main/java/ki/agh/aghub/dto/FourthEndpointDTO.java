package ki.agh.aghub.dto;

import java.util.List;

public class FourthEndpointDTO {

    private List<EventsDTO> acceptedEvents;
    private List<EventsDTO> declinedEvents;
    private List<EventsDTO> pendingEvents;

    public FourthEndpointDTO(List<EventsDTO> acceptedEvents, List<EventsDTO> declinedEvents, List<EventsDTO> pendingEvents) {
        this.acceptedEvents = acceptedEvents;
        this.declinedEvents = declinedEvents;
        this.pendingEvents = pendingEvents;
    }

    public List<EventsDTO> getAcceptedEvents() {
        return acceptedEvents;
    }

    public void setAcceptedEvents(List<EventsDTO> acceptedEvents) {
        this.acceptedEvents = acceptedEvents;
    }

    public List<EventsDTO> getDeclinedEvents() {
        return declinedEvents;
    }

    public void setDeclinedEvents(List<EventsDTO> declinedEvents) {
        this.declinedEvents = declinedEvents;
    }

    public List<EventsDTO> getPendingEvents() {
        return pendingEvents;
    }

    public void setPendingEvents(List<EventsDTO> pendingEvents) {
        this.pendingEvents = pendingEvents;
    }
}
