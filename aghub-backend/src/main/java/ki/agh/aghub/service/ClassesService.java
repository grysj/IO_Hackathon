package ki.agh.aghub.service;

import jakarta.persistence.EntityNotFoundException;
import ki.agh.aghub.entity.ClassesDTO;
import ki.agh.aghub.entity.UsersDTO;
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

    public List<ClassesDTO> findAllClasses() {
        return this.classesRepository.findAll().stream()
                .map(klass -> new ClassesDTO(
                        klass.getName(),
                        klass.getDateStart(),
                        klass.getDateEnd(),
                        klass.getRoom(),
                        klass.getPoi() != null ? klass.getPoi().getId() : null,
                        klass.getUser() != null ? klass.getUser().getId() : null
                )).collect(Collectors.toList());
    }

    public ClassesDTO findByIdClasses(Long id) {
        return this.classesRepository.findById(id)
                .map(klass -> new ClassesDTO(
                        klass.getName(),
                        klass.getDateStart(),
                        klass.getDateEnd(),
                        klass.getRoom(),
                        klass.getPoi() != null ? klass.getPoi().getId() : null,
                        klass.getUser() != null ? klass.getUser().getId() : null
                )).orElseThrow(() -> new EntityNotFoundException("Class not found with id: " + id));
    }

    public void saveClass(ClassesDTO classesDTO) {

        Class klass = new Class();
        klass.setName(classesDTO.getName());
        klass.setDateStart(classesDTO.getStartDate());
        klass.setDateEnd(classesDTO.getEndDate());
        klass.setRoom(classesDTO.getRoom());
        klass.setPoi(poiRepository.findById(classesDTO.getPoiId()).orElse(null));
        klass.setUser(usersRepository.findById(classesDTO.getUserId()).orElse(null));

        classesRepository.save(klass);
    }

    public List<ClassesDTO> getUserClassesByDate(String userId, LocalDateTime date) {
    try {
        Long parsedUserId = Long.parseLong(userId);
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(23, 59, 59);

        return classesRepository.findByUserIdAndDate(parsedUserId, startOfDay, endOfDay)
                .stream()
                .map(classesDTO -> new ClassesDTO(
                        classesDTO.getName(),
                        classesDTO.getDateStart(),
                        classesDTO.getDateEnd(),
                        classesDTO.getRoom(),
                        classesDTO.getPoi() != null ? classesDTO.getPoi().getId() : null,
                        classesDTO.getUser() != null ? classesDTO.getUser().getId() : null
                ))
                .collect(Collectors.toList());

    } catch (Exception e) {
        throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
    }
}
}
