package ki.agh.aghub.dto;

import java.time.LocalDateTime;

public record ClassesDTO(
    String name,
    String room,
    LocalDateTime startDate,
    LocalDateTime endDate,
    Long poiId,
    Long userId
) {
}