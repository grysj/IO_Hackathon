package ki.agh.aghub.rest;

import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.entity.FourthEndpointDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class FourthEndpointController {

    private EventsService eventsService;

    public FourthEndpointController(EventsService eventsService) {
        this.eventsService = eventsService;
    }

    @GetMapping("/fourth/{user_id}")
    public FourthEndpointDTO getEventsByUserId(@PathVariable Integer user_id) {
        List<EventsDTO> acceptedEvents = this.eventsService.;
        List<EventsDTO> declinedEvents = this.eventsService.;
        List<EventsDTO> pendingEvents = this.eventsService.;

        FourthEndpointDTO fourthEndpointDTO = new FourthEndpointDTO(acceptedEvents, declinedEvents, pendingEvents);
        return fourthEndpointDTO;

    }

}
