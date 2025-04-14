package ki.agh.aghub.service;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.model.User;
import ki.agh.aghub.repository.EventRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final PoiRepository poiRepository;
    private final UsersRepository usersRepository;

    public EventService(
        EventRepository eventsRepository, 
        PoiRepository poiRepository, 
        UsersRepository usersRepository
    ) {
        this.eventRepository = eventsRepository;
        this.poiRepository = poiRepository;
        this.usersRepository = usersRepository;
    }

    public Set<UserDTO> getParticipantsForEvent(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));

        return event.getParticipants().stream()
                .map(UserDTO::fromUser)
                .collect(Collectors.toSet());
    }

    public List<EventDTO> findAllEvents() {
        return this.eventRepository.findAll().stream()
                .map(EventDTO::fromEvent)
                .collect(Collectors.toList());
    }

    public EventDTO findEventById(Long id) {
        return this.eventRepository.findById(id)
            .map(EventDTO::fromEvent)
            .orElseThrow(() -> 
                new EntityNotFoundException("Event not found with id: " + id)
            );
    }

    @Transactional
    public EventDTO saveEvent(EventDTO eventDTO) {
        Event event = EventDTO.toEvent(eventDTO);
        event.setPoi(this.poiRepository.findById(eventDTO.poiId())
            .orElse(null)
        );
        event.setCreatedBy(this.usersRepository.findById(eventDTO.createdById())
            .orElse(null)
        );

        event.setParticipants(Set.of(event.getCreatedBy()));

        Event savedEvent = this.eventRepository.save(event);
        return EventDTO.fromEvent(savedEvent);
    }

    @Transactional
    public void addParticipantToEvent(Long eventId, Long userId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + eventId));

        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        event.getParticipants().add(user);
        eventRepository.save(event);
    }


    @Transactional
    public void deleteEvent(Long id) {
        this.eventRepository.deleteById(id);
    }

    public List<EventDTO> getUserEventsByDate(Long userId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        return eventRepository.findEventsByUserIdAndDateRange(userId, dateStart, dateEnd)
            .stream()
            .map(EventDTO::fromEvent)
            .collect(Collectors.toList());
    }

}
