package ki.agh.aghub.mapper;

import org.springframework.stereotype.Component;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.model.Event;

@Component
public class EventMapper {
    public EventDTO toDto(Event event) {
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

    public Event fromDto(EventDTO eventDTO) {
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
