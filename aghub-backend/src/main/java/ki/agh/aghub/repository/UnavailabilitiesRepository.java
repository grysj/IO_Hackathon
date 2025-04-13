package ki.agh.aghub.repository;

import ki.agh.aghub.model.Unavailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
public interface UnavailabilitiesRepository extends JpaRepository<Unavailability, Long> {
    @Query("""
    SELECT u FROM Unavailability u
    WHERE u.user.id = :userId
      AND u.dateStart BETWEEN :startDate AND :endDate
    """)
    List<Unavailability> findByUserIdAndDate(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

}
