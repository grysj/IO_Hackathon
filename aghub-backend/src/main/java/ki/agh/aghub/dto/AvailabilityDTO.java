package ki.agh.aghub.dto;

import java.time.LocalDateTime;

public record AvailabilityDTO(
        LocalDateTime startDate,
        LocalDateTime endDate
) {

}
