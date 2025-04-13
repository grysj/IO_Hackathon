package ki.agh.aghub.controller;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private EventService eventsService;

    public EventController(EventService eventsService) {
        this.eventsService = eventsService;
    }

    @GetMapping("")
    public List<EventDTO> findAllEvents() {
        return this.eventsService.findAllEvents();
    }

    @GetMapping("/{id}")
    public EventDTO findEventById(@PathVariable Long id) {
        return this.eventsService.findEventById(id);
    }

    @PostMapping("")
    public void saveEvent(@RequestBody EventDTO eventDto) {
        this.eventsService.saveEvent(eventDto);
    }

}
