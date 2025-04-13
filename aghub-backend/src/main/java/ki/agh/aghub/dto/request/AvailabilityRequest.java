package ki.agh.aghub.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

public record AvailabilityRequest (
        @NotNull
        LocalDateTime startDate,
        @NotNull
        LocalDateTime endDate,
        @NotNull
        Duration minDuration,
        @NotEmpty
        List<Long> usersId
){
}
