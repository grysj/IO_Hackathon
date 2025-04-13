package ki.agh.aghub.dto;

import java.util.List;

public record EventByTypeDTO(
    List<EventDTO> acceptedEvents,
    List<EventDTO> declinedEvents,
    List<EventDTO> pendingEvents
) {
}
