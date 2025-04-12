package ki.agh.aghub.controller;

import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.service.EventsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventsController {

    private EventsService eventsService;

    public EventsController(EventsService eventsService) {
        this.eventsService = eventsService;
    }

    @GetMapping("/events")
    public List<EventsDTO> findAllEvents() {
        return this.eventsService.findAllEvents();
    }

    @PostMapping("/events")
    public void saveEvent(@RequestBody Event event) {
        this.eventsService.saveEvent(event);
    }

    @GetMapping("/events/{id}")
    public Event findEventById(@PathVariable Long id) {
        return this.eventsService.findEventById(id);
    }
}
