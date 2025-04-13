package ki.agh.aghub.dto;

import java.time.LocalDateTime;

import ki.agh.aghub.model.Unavailability;

public record UnavailabilityDTO (
    String title,
    String description,
    LocalDateTime dateStart,
    LocalDateTime dateEnd
) {

    public static UnavailabilityDTO fromUnavailability(
        Unavailability unavailability
    ) {
        return new UnavailabilityDTO(
            unavailability.getName(),
            unavailability.getDescription(),
            unavailability.getDateStart(),
            unavailability.getDateEnd()
        );
    }

    public static Unavailability toUnavailability(
        UnavailabilityDTO unavailabilityDTO
    ) {
        return Unavailability.builder()
            .name(unavailabilityDTO.title())
            .description(unavailabilityDTO.description())
            .dateStart(unavailabilityDTO.dateStart())
            .dateEnd(unavailabilityDTO.dateEnd())
            .build();
    }

}