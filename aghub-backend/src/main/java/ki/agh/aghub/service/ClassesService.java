package ki.agh.aghub.service;

import ki.agh.aghub.model.Class;
import ki.agh.aghub.repository.ClassesRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ClassesService {

    private final ClassesRepository classesRepository;

    public ClassesService(ClassesRepository classesRepository) {
        this.classesRepository = classesRepository;
    }


    public List<Class> getUserClassesByDate(String userId, String date) {
        try {
            Long parsedUserId = Long.parseLong(userId);
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
            LocalDateTime startOfDay = parsedDate.atStartOfDay();
            LocalDateTime endOfDay = parsedDate.atTime(23, 59, 59);

            return classesRepository.findByUserIdAndDate(parsedUserId, startOfDay, endOfDay);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid userId or date format. Expected format: yyyy-MM-dd", e);
        }

    }

}
