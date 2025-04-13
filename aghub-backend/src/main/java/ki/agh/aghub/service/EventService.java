package ki.agh.aghub.service;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.repository.EventRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;
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
            .orElseThrow(() -> 
                new EntityNotFoundException(
                    "POI not found with id: " + eventDTO.poiId()
                )
            )
        );
        event.setCreatedBy(this.usersRepository.findById(eventDTO.createdById())
            .orElseThrow(() -> 
                new EntityNotFoundException(
                    "User not found with id: " + eventDTO.createdById()
                )
            )
        );
        Event savedEvent = this.eventRepository.save(event);
        return EventDTO.fromEvent(savedEvent);
    }

    @Transactional
    public void deleteEvent(Long id) {
        this.eventRepository.deleteById(id);
    }

    public List<EventDTO> getUserEventsByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return eventRepository.findEventsByUserIdBetweenDates(userId, startDate, endDate)
            .stream()
            .map(EventDTO::fromEvent)
            .collect(Collectors.toList());
    }

}
