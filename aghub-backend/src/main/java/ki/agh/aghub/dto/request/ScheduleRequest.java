package ki.agh.aghub.dto.request;

import java.time.LocalDateTime;

public record ScheduleRequest(
        Long id,
        LocalDateTime dateStart,
        LocalDateTime dateEnd
) {
}
