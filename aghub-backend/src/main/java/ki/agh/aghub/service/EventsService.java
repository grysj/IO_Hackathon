package ki.agh.aghub.service;


import ki.agh.aghub.dto.EventsDTO;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.repository.EventsRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventsService {

    private final EventsRepository eventsRepository;

    private final PoiRepository poiRepository;

    private final UsersRepository usersRepository;

    public EventsService(EventsRepository eventsRepository, PoiRepository poiRepository, UsersRepository usersRepository) {
        this.eventsRepository = eventsRepository;
        this.poiRepository = poiRepository;
        this.usersRepository = usersRepository;
    }

    public List<EventsDTO> findAllEvents() {
        return this.eventsRepository.findAll().stream()
                .map(event -> new EventsDTO(
                        event.getName(),
                        event.getDescription(),
                        event.getDateStart(),
                        event.getDateEnd(),
                        event.getLatitude(),
                        event.getLongitude(),
                        event.getPoiId() != null ? event.getPoiId().getId() : null,
                        event.getCreatedBy() != null ? event.getCreatedBy().getId() : null
                )).collect(Collectors.toList());
    }

    public EventsDTO findByIdEvents(Long id) {
        return this.eventsRepository.findById(id)
                .map(event -> new EventsDTO(
                        event.getName(),
                        event.getDescription(),
                        event.getDateStart(),
                        event.getDateEnd(),
                        event.getLatitude(),
                        event.getLongitude(),
                        event.getPoiId() != null ? event.getPoiId().getId() : null,
                        event.getCreatedBy() != null ? event.getCreatedBy().getId() : null
                )).orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public void saveEvent(EventsDTO eventsDTO) {
        Event event = new Event();
        event.setName(eventsDTO.getName());
        event.setDescription(eventsDTO.getDescription());
        event.setDateStart(eventsDTO.getDateStart());
        event.setDateEnd(eventsDTO.getDateEnd());
        event.setLatitude(eventsDTO.getLatitude());
        event.setLongitude(eventsDTO.getLongitude());
        event.setPoiId(this.poiRepository.findById(eventsDTO.getPoiId())
                .orElseThrow(() -> new EntityNotFoundException("POI not found with id: " + eventsDTO.getPoiId())));
    }

    public List<EventsDTO> getUserEventsByDate(String userId, LocalDateTime date) {
        try {
            Long parsedUserId = Long.parseLong(userId);

            return eventsRepository.findUpcomingEventsByUserId(parsedUserId, date)
                    .stream()
                    .map(event -> {
                        EventsDTO dto = new EventsDTO(
                                event.getName(),
                                event.getDescription(),
                                event.getDateStart(),
                                event.getDateEnd(),
                                event.getLatitude(),
                                event.getLongitude(),
                                event.getPoiId().getId(),
                                event.getCreatedBy().getId() != null ? event.getCreatedBy().getId() : null
                        );
                        if (event.getPoiId() != null) {
                            dto.setPoiId(event.getPoiId().getId());
                        }
                        return dto;
                    })
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
        }
    }

    public Event findEventById(Long id) {
        return this.eventsRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public void saveEvent(Event event) {
        this.eventsRepository.save(event);
    }

}
