package ki.agh.aghub.repository;

import ki.agh.aghub.model.Unavailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
public interface UnavailabilitiesRepository extends JpaRepository<Unavailability, Long> {
    @Query("SELECT u FROM Unavailability u " +
           "WHERE u.user.id = :userId " +
           "AND u.date_start BETWEEN :startOfDay AND :endOfDay")
    List<Unavailability> findByUserIdAndDate(Long userId, LocalDateTime startOfDay, LocalDateTime endOfDay);
}
