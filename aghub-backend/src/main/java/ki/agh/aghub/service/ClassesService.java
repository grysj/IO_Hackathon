package ki.agh.aghub.service;

import ki.agh.aghub.dto.ClassesDTO;
import jakarta.persistence.EntityNotFoundException;
import ki.agh.aghub.repository.ClassesRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassesService {

    private final ClassesRepository classesRepository;

    public ClassesService(
        ClassesRepository classesRepository, 
        PoiRepository poiRepository, 
        UsersRepository usersRepository
    ) { 
        this.classesRepository = classesRepository;
    }

    public List<ClassesDTO> findAllClasses() {
        return this.classesRepository.findAll().stream()
            .map(ClassesDTO::fromClasses)
            .collect(Collectors.toList());
    }

    public ClassesDTO findByIdClasses(Long id) {
        return this.classesRepository.findById(id)
                .map(ClassesDTO::fromClasses)
                .orElseThrow(() -> 
                    new EntityNotFoundException("Class not found with id: " + id)
                );
    }

    public void saveClasses(ClassesDTO classesDTO) {
        classesRepository.save(ClassesDTO.toClasses(classesDTO));
    }

    public List<ClassesDTO> getUserClassesByDate(Long userId, LocalDateTime date) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = date.toLocalDate().atTime(LocalTime.MAX);

        return classesRepository.findByUserIdAndDateStartBetween(userId, startOfDay, endOfDay)
            .stream()
            .map(ClassesDTO::fromClasses)
            .collect(Collectors.toList());

    }
                       
}