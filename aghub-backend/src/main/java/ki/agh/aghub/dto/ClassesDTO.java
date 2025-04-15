package ki.agh.aghub.dto;

import java.time.LocalDateTime;

import ki.agh.aghub.model.Classes;
import ki.agh.aghub.service.ClassesService;
import ki.agh.aghub.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;

public record ClassesDTO(
    String name,
    String room,
    LocalDateTime dateStart,
    LocalDateTime dateEnd,
    Long poiId,
    Long userId
) {

    private static UsersService usersService;

    public static ClassesDTO fromClasses(Classes classes) {
        return new ClassesDTO(
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
            .dateStart(classesDTO.dateStart())
            .dateEnd(classesDTO.dateEnd())
            .user(UserDTO.toUser(usersService.findByIdUser(classesDTO.userId()), null))
            .build();
    }
}