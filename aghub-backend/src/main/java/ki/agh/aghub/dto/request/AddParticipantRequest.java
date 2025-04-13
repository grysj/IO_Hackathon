package ki.agh.aghub.dto.request;

public record AddParticipantRequest(
        Long eventId,
        Long userId
) {
}
