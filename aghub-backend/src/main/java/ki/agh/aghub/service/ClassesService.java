package ki.agh.aghub.service;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.model.Class;
import ki.agh.aghub.repository.ClassesRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassesService {

    private final ClassesRepository classesRepository;
    private final PoiRepository poiRepository;
    private final UsersRepository usersRepository;
    public ClassesService(ClassesRepository classesRepository, PoiRepository poiRepository, UsersRepository usersRepository) {

        this.classesRepository = classesRepository;
        this.poiRepository = poiRepository;
        this.usersRepository = usersRepository;
    }


    public List<ClassesDTO> getUserClassesByDate(String userId, String date) {
    try {
        Long parsedUserId = Long.parseLong(userId);
        LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        LocalDateTime startOfDay = parsedDate.atStartOfDay();
        LocalDateTime endOfDay = parsedDate.atTime(23, 59, 59);

        return classesRepository.findByUserIdAndDate(parsedUserId, startOfDay, endOfDay)
                .stream()
                .map(c -> new ClassesDTO(
                        c.getName(),
                        c.getDate_start().toString(),
                        c.getDate_end().toString(),
                        c.getRoom(),
                        c.getPoi() != null ? c.getPoi().getId().intValue() : null,
                        c.getUser() != null ? c.getUser().getId().intValue() : null
                ))
                .collect(Collectors.toList());

    } catch (Exception e) {
        throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
    }
}



    public void saveDTO(ClassesDTO classDTO) {

        Class newClass = new Class();
        newClass.setName(classDTO.getName());
        newClass.setDate_start(LocalDateTime.parse(classDTO.getStartDate(), DateTimeFormatter.ISO_DATE));
        newClass.setDate_end(LocalDateTime.parse(classDTO.getEndDate(), DateTimeFormatter.ISO_DATE));
        newClass.setRoom(classDTO.getRoom());
        newClass.setPoi(poiRepository.findById(Long.valueOf(classDTO.getPoiId())).orElse(null));
        newClass.setUser(usersRepository.findById(Long.valueOf(classDTO.getUserId())).orElse(null));

        classesRepository.save(newClass);
    }

}
