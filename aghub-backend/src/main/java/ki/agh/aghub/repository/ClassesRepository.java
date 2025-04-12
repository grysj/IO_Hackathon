package ki.agh.aghub.repository;
import ki.agh.aghub.model.Classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassesRepository extends JpaRepository<Classes, Long> {
    // @Query("SELECT c FROM Classes c " +
    //        "WHERE c.user.id = :userId " +
    //        "AND c.dateStart BETWEEN :startOfDay AND :endOfDay")
    // List<Classes> findByUserIdAndDate(Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    // Possibly can be done like this
    List<Classes> findByUserIdAndDateStartBetween(
        Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay
    );
}
