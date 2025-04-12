package ki.agh.aghub.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class UnavailabilityDTO {

    private String title;

    private String description;

    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;

    public UnavailabilityDTO(String title, String description, LocalDateTime dateStart, LocalDateTime dateEnd) {
        this.title = title;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

}
