package ki.agh.aghub.rest;

import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.entity.FourthEndpointDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public class EventsController {

    private EventsService eventsService;

    public EventsController(EventsService eventsService) {
        this.eventsService = eventsService;
    }

    @GetMapping("/events/{user_id}")
    public FourthEndpointDTO getEventsByUserId(@PathVariable Integer user_id) {
        List<EventsDTO> acceptedEvents = this.eventsService.;
        List<EventsDTO> declinedEvents = this.eventsService.;
        List<EventsDTO> pendingEvents = this.eventsService.;

        FourthEndpointDTO fourthEndpointDTO = new FourthEndpointDTO(acceptedEvents, declinedEvents, pendingEvents);
        return fourthEndpointDTO;

    }

}
