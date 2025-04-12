package ki.agh.aghub.service;

import ki.agh.aghub.dto.ClassesDTO;
import jakarta.persistence.EntityNotFoundException;
import ki.agh.aghub.mapper.ClassesMapper;
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
    private final ClassesMapper classesMapper;

    public ClassesService(
        ClassesRepository classesRepository, 
        PoiRepository poiRepository, 
        UsersRepository usersRepository,
        ClassesMapper classesMapper
    ) { 
        this.classesRepository = classesRepository;
        this.classesMapper = classesMapper;
    }

    public List<ClassesDTO> findAllClasses() {
        return this.classesRepository.findAll().stream()
            .map(classesMapper::toDto)
            .collect(Collectors.toList());
    }

    public ClassesDTO findByIdClasses(Long id) {
        return this.classesRepository.findById(id)
                .map(classesMapper::toDto)
                .orElseThrow(() -> 
                    new EntityNotFoundException("Class not found with id: " + id)
                );
    }

    public void saveClasses(ClassesDTO classesDTO) {
        classesRepository.save(classesMapper.fromDto(classesDTO));
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
            .map(classesMapper::toDto)
            .collect(Collectors.toList());

    }
                       
}