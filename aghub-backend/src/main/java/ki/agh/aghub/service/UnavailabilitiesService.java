package ki.agh.aghub.service;


import ki.agh.aghub.entity.UnavailabilityDTO;
import ki.agh.aghub.model.Unavailability;
import ki.agh.aghub.repository.UnavailabilitiesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnavailabilitiesService {
    private final UnavailabilitiesRepository unavailabilitiesRepository;

    public UnavailabilitiesService(UnavailabilitiesRepository unavailabilitiesRepository) {
        this.unavailabilitiesRepository = unavailabilitiesRepository;
    }

    public List<UnavailabilityDTO> getUserUnavailabilitiesByDate(String userId, LocalDateTime date) {
    try {
        Long parsedUserId = Long.parseLong(userId);
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);

        return unavailabilitiesRepository.findByUserIdAndDate(parsedUserId, startOfDay, endOfDay)
                .stream()
                .map(u -> new UnavailabilityDTO(
                        u.getName(),
                        u.getDescription(),
                        u.getDate_start().toString(),
                        u.getDate_end().toString()
                ))
                .collect(Collectors.toList());

    } catch (Exception e) {
        throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
    }
}

}
