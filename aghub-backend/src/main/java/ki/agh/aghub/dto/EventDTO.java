package ki.agh.aghub.dto;

import java.time.LocalDateTime;

import ki.agh.aghub.model.Event;

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

    public static EventDTO fromEvent(Event event) {
        return new EventDTO(
            event.getName(),
            event.getDescription(),
            event.getDateStart(),
            event.getDateEnd(),
            event.getLatitude(),
            event.getLongitude(),
            event.getPoi() != null ? event.getPoi().getId() : null,
            event.getCreatedBy() != null ? event.getCreatedBy().getId() : null
        );
    }

    public static Event toEvent(EventDTO eventDTO) {
        return Event.builder()
            .name(eventDTO.name())
            .description(eventDTO.description())
            .dateStart(eventDTO.dateStart())
            .dateEnd(eventDTO.dateEnd())
            .latitude(eventDTO.latitude())
            .longitude(eventDTO.longitude())
            .build();
    }
}
