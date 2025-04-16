package ki.agh.aghub.dto.request;


import java.time.LocalDateTime;
import java.util.List;

public record UsersScheduleRequest(
        List<Long> usersId,
        LocalDateTime dateStart,
        LocalDateTime dateEnd
) {
}
