package ki.agh.aghub.service;


import ki.agh.aghub.dto.UnavailabilityDTO;
import ki.agh.aghub.repository.UnavailabilitiesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnavailabilitiesService {
    private final UnavailabilitiesRepository unavailabilitiesRepository;

    public UnavailabilitiesService(UnavailabilitiesRepository unavailabilitiesRepository) {
        this.unavailabilitiesRepository = unavailabilitiesRepository;
    }

    public List<UnavailabilityDTO> getUserUnavailabilitiesByDate(Long userId, LocalDateTime date) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }
        
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);

        return unavailabilitiesRepository.findByUserIdAndDate(userId, startOfDay, endOfDay)
            .stream()
            .map(UnavailabilityDTO::fromUnavailability)
            .collect(Collectors.toList());

}

}
