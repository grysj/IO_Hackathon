package ki.agh.aghub.service;


import ki.agh.aghub.dto.EventsDTO;
import ki.agh.aghub.repository.EventsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventsService {

    private final EventsRepository eventsRepository;

    public EventsService(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }


   public List<EventsDTO> getUserEventsByDate(String userId, String date) {
    try {
        Long parsedUserId = Long.parseLong(userId);
        LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);

        return eventsRepository.findByUserIdAndStartDate(parsedUserId, parsedDate)
                .stream()
                .map(event -> {
                    EventsDTO dto = new EventsDTO(
                            event.getName(),
                            event.getDescription(),
                            event.getDate_start().toString(),
                            event.getDate_end().toString(),
                            event.getLat(),
                            event.getLng(),
                            event.getCreated_by() != null ? event.getCreated_by().getId().intValue() : null
                    );
                    if (event.getPoi_id() != null) {
                        dto.setPoiId(event.getPoi_id().getId().intValue());
                    }
                    return dto;
                })
                .collect(Collectors.toList());

    } catch (Exception e) {
        throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
    }
}

}
