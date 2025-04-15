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
              AND u.dateStart BETWEEN :dateStart AND :dateEnd
            """)
    List<Unavailability> findByUserIdAndDate(
            @Param("userId") Long userId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );

    @Query("""
                SELECT u FROM Unavailability u
                WHERE u.user.id = :userId
                AND (
                    (:dateStart BETWEEN u.dateStart AND u.dateEnd)
                    OR (:dateEnd BETWEEN u.dateStart AND u.dateEnd)
                    OR (u.dateStart BETWEEN :dateStart AND :dateEnd)
                    OR (u.dateEnd BETWEEN :dateStart AND :dateEnd)
                )
            """)
    List<Unavailability> findAllOverlappingByUserId(
            @Param("userId") Long userId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );


}
