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

    public ClassesDTO saveClasses(ClassesDTO classesDTO) {
        return ClassesDTO.fromClasses(classesRepository.save(ClassesDTO.toClasses(classesDTO)));
    }

    public void deleteClasses(Long id) {
        this.classesRepository.deleteById(id);
    }

    public List<ClassesDTO> getUserClassesByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return classesRepository.findByUserIdAndDateStartBetween(userId, startDate, endDate)
            .stream()
            .map(ClassesDTO::fromClasses)
            .collect(Collectors.toList());
    }
                       
}