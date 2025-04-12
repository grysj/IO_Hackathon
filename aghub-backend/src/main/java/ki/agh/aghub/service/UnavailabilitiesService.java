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
    try {
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);

        return unavailabilitiesRepository.findByUserIdAndDate(userId, startOfDay, endOfDay)
                .stream()
                .map(u -> new UnavailabilityDTO(
                        u.getName(),
                        u.getDescription(),
                        u.getDate_start(),
                        u.getDate_end()
                ))
                .collect(Collectors.toList());

    } catch (Exception e) {
        throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
    }
}

}
