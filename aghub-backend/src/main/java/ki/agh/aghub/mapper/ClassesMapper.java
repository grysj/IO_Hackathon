package ki.agh.aghub.mapper;

import org.springframework.stereotype.Component;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.model.Classes;

@Component
public class ClassesMapper {

    public ClassesDTO toDto(Classes classes) {
        return new ClassesDTO(
            classes.getName(),
            classes.getRoom(),
            classes.getDateStart(),
            classes.getDateEnd(),
            classes.getPoi() != null ? classes.getPoi().getId() : null,
            classes.getUser() != null ? classes.getUser().getId() : null
        );
    }

    public Classes fromDto(ClassesDTO classesDTO) {
        return Classes.builder()
            .name(classesDTO.name())
            .room(classesDTO.room())
            .dateStart(classesDTO.startDate())
            .dateEnd(classesDTO.endDate())
            .build();
    }
    
}
