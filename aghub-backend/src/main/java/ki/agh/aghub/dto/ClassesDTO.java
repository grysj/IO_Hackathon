package ki.agh.aghub.dto;

import java.time.LocalDateTime;

import ki.agh.aghub.model.Classes;

public record ClassesDTO(
    Long id,
    String name,
    String room,
    LocalDateTime startDate,
    LocalDateTime endDate,
    Long poiId,
    Long userId
) {

    public static ClassesDTO fromClasses(Classes classes) {
        return new ClassesDTO(
            classes.getId(),
            classes.getName(),
            classes.getRoom(),
            classes.getDateStart(),
            classes.getDateEnd(),
            classes.getPoi() != null ? classes.getPoi().getId() : null,
            classes.getUser() != null ? classes.getUser().getId() : null
        );
    }

    public static Classes toClasses(ClassesDTO classesDTO) {
        return Classes.builder()
            .name(classesDTO.name())
            .room(classesDTO.room())
            .dateStart(classesDTO.startDate())
            .dateEnd(classesDTO.endDate())
            .build();
    }
}