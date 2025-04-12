package ki.agh.aghub.dto;

import java.time.LocalDateTime;

public record EventDTO(
    String name,
    String description,
    LocalDateTime dateStart,
    LocalDateTime dateEnd,
    Double latitude,
    Double longitude,
    Long poiId,
    Long createdById
) {
}
