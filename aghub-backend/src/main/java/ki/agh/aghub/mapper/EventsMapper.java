package ki.agh.aghub.mapper;

import org.springframework.stereotype.Component;

import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.model.Event;

@Component
public class EventsMapper {
    public Event fromDto(EventDTO dto) {
        return new Event(
            null,
            dto.getLatitude(),
            dto.getLongitude(),
            dto.getName(),
            dto.getDescription(),
            dto.getDateStart(),
            dto.getDateEnd(),
            dto.getPoiId(),
            dto.getCreatedById()
        );
    }
}
