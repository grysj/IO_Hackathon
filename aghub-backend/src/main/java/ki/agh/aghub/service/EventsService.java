package ki.agh.aghub.service;


import ki.agh.aghub.model.Event;
import ki.agh.aghub.repository.EventsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EventsService {


    private final EventsRepository eventsRepository;

    public EventsService(EventsRepository eventsRepository) {
        this.eventsRepository = eventsRepository;
    }


    public List<Event> getUserEventsByDate(String userId, String date) {
        try {
            Long parsedUserId = Long.parseLong(userId);
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            return eventsRepository.findByUserIdAndStartDate(parsedUserId, parsedDate);
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
            }
        }
}
