package ki.agh.aghub.service;


import ki.agh.aghub.model.Unavailability;
import ki.agh.aghub.repository.UnavailabilitiesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UnavailabilitiesService {
    private final UnavailabilitiesRepository unavailabilitiesRepository;

    public UnavailabilitiesService(UnavailabilitiesRepository unavailabilitiesRepository) {
        this.unavailabilitiesRepository = unavailabilitiesRepository;
    }

    public List<Unavailability> getUserUnavailabilitiesByDate(String userId, String date) {
        try {
            Long parsedUserId = Long.parseLong(userId);
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            LocalDateTime startOfDay = parsedDate.atStartOfDay();
            LocalDateTime endOfDay = parsedDate.atTime(23, 59, 59);

            return unavailabilitiesRepository.findByUserIdAndDate(parsedUserId, startOfDay, endOfDay);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
        }
    }

}
