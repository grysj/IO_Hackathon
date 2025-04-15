package ki.agh.aghub.mapper;

import org.springframework.stereotype.Component;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.dto.POIDTO;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.model.Classes;
import ki.agh.aghub.model.User;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import ki.agh.aghub.model.POI;
import ki.agh.aghub.service.UsersService;
import ki.agh.aghub.service.PoiService;

@Component
public class ClassesMapper {

    private final UsersRepository usersRepository;
    private final PoiRepository poiRepository;

    public ClassesMapper(UsersRepository usersRepository, PoiRepository poiRepository) {
        this.usersRepository = usersRepository;
        this.poiRepository = poiRepository;
    }

    public static ClassesDTO toDto(Classes classes) {
        return new ClassesDTO(
            classes.getName(),
            classes.getRoom(),
            classes.getDateStart(),
            classes.getDateEnd(),
            classes.getPoi() != null ? classes.getPoi().getId() : null,
            classes.getUser() != null ? classes.getUser().getId() : null
        );
    }

    public Classes fromDto(ClassesDTO dto) {
        User user = dto.userId() != null
            ? usersRepository.findById(dto.userId()).orElseThrow(() -> 
                new RuntimeException("User not found")
            )
            : null;

        POI poi = dto.poiId() != null
            ? poiRepository.findById(dto.poiId()).orElseThrow(() -> 
                new RuntimeException("POI not found")
            )
            : null;

        return Classes.builder()
            .name(dto.name())
            .room(dto.room())
            .dateStart(dto.dateStart())
            .dateEnd(dto.dateEnd())
            .user(user)
            .poi(poi)
            .build();
    }
}