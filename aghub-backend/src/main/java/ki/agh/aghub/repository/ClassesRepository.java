package ki.agh.aghub.repository;
import ki.agh.aghub.model.Classes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassesRepository extends JpaRepository<Classes, Long> {
    @Query("SELECT c FROM Classes c " +
            "WHERE c.user.id = :userId " +
            "AND c.dateStart BETWEEN :startDate AND :endDate")
    List<Classes> findByUserIdAndDateStartBetween(@Param("userId") Long userId,
                                                       @Param("startDate") LocalDateTime startDate,
                                                         @Param("endDate") LocalDateTime endDate);

    @Query("""
    SELECT c FROM Classes c 
    WHERE c.user.id = :userId 
    AND (
        (:startDate BETWEEN c.dateStart AND c.dateEnd)
        OR (:endDate BETWEEN c.dateStart AND c.dateEnd)
        OR (c.dateStart BETWEEN :startDate AND :endDate)
        OR (c.dateEnd BETWEEN :startDate AND :endDate)
    )
""")
    List<Classes> findAllOverlappingByUserId(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}
