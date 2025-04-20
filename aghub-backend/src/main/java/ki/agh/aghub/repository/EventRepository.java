package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("""
        SELECT e FROM Event e
        JOIN e.participants p
        WHERE p.id = :userId
        AND e.dateStart >= :dateStart
        AND e.dateEnd <= :dateEnd
    """)
    List<Event> findEventsByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("dateStart") LocalDateTime dateStart,
        @Param("dateEnd") LocalDateTime dateEnd
    );
    List<Event> findEventsByCreatedByIdAndDateRange(
            @Param("userId") Long userId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );

    @Query("""
                SELECT e FROM Event e
                WHERE e.createdBy.id = :userId
                AND (
                    (:dateStart BETWEEN e.dateStart AND e.dateEnd)
                    OR (:dateEnd BETWEEN e.dateStart AND e.dateEnd)
                    OR (e.dateStart BETWEEN :dateStart AND :dateEnd)
                    OR (e.dateEnd BETWEEN :dateStart AND :dateEnd)
                )
            """)
    List<Event> findAllOverlappingCreatedByUserId(
            @Param("userId") Long userId,
            @Param("dateStart") LocalDateTime dateStart,
            @Param("dateEnd") LocalDateTime dateEnd
    );


}

