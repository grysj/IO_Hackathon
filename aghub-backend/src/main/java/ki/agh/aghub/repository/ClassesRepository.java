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
            "AND c.dateStart BETWEEN :dateStart AND :dateEnd")
    List<Classes> findByUserIdAndDateStartBetween(@Param("userId") Long userId,
                                                       @Param("dateStart") LocalDateTime dateStart,
                                                       @Param("dateEnd") LocalDateTime dateEnd);

    @Query("""
    SELECT c FROM Classes c 
    WHERE c.user.id = :userId 
    AND (
        (:dateStart BETWEEN c.dateStart AND c.dateEnd)
        OR (:dateEnd BETWEEN c.dateStart AND c.dateEnd)
        OR (c.dateStart BETWEEN :dateStart AND :dateEnd)
        OR (c.dateEnd BETWEEN :dateStart AND :dateEnd)
    )
""")
    List<Classes> findAllOverlappingByUserId(
            @Param("userId") Long userId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );
}
