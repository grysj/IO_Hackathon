package ki.agh.aghub.repository;
import ki.agh.aghub.model.Classes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassesRepository extends JpaRepository<Classes, Long> {
    List<Classes> findByUserIdAndDateStartBetween(
        Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay
    );
}
