package ki.agh.aghub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record EventCreateRequest(
        @NotBlank(message = "Username cannot be empty")
        String name,
        String description,
        @NotNull(message = "dateStart is null")
        LocalDateTime dateStart,
        @NotNull(message = "dateEnd is null")
        LocalDateTime dateEnd,
        @NotBlank(message = "latitude cannot be empty")
        Double latitude,
        @NotBlank(message = "longitude cannot be empty")
        Double longitude,
        Long poiId,
        @NotBlank(message = "createdById cannot be empty")
        Long createdById,
        List<Long> participantsId
) {
}
