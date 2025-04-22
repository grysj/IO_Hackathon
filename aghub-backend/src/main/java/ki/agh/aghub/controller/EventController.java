package ki.agh.aghub.controller;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.dto.request.AddParticipantRequest;
import ki.agh.aghub.dto.request.EventCreateRequest;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

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

    //TODO change
    @PostMapping("")
    public void saveEvent(@RequestBody EventDTO eventDto) {
        this.eventsService.saveEvent(eventDto);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createEvent(@RequestBody EventCreateRequest request) {
        Event event = this.eventsService.createEvent(request.createdById(), request.dateStart(), request.dateEnd(), request.name(), request.description(), request.latitude(), request.longitude(), request.poiId(), request.participantsId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Wydarzenie utworzone", "eventId", event.getId()));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        this.eventsService.deleteEvent(id);
    }

    @PostMapping("/add_participant")
    public void addParticipantToEvent(@RequestBody AddParticipantRequest addParticipantRequest) {
        this.eventsService.addParticipantToEvent(addParticipantRequest.eventId(), addParticipantRequest.userId());
    }

    @GetMapping("/participant/{id}")
    public Set<UserDTO> getParticipantsForEvent(@PathVariable Long id) {
        return this.eventsService.getParticipantsForEvent(id);
    }

}
