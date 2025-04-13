package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e JOIN e.participants p " +
            "WHERE p.id = :userId " +
            "AND e.dateStart >= :startDate " +
            "AND e.dateStart <= :endDate")
    List<Event> findEventsByUserIdBetweenDates(@Param("userId") Long userId,
                                               @Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate);

    @Query("""
                SELECT e FROM Event e
                WHERE e.createdBy.id = :userId
                AND (
                    (:startDate BETWEEN e.dateStart AND e.dateEnd)
                    OR (:endDate BETWEEN e.dateStart AND e.dateEnd)
                    OR (e.dateStart BETWEEN :startDate AND :endDate)
                    OR (e.dateEnd BETWEEN :startDate AND :endDate)
                )
            """)
    List<Event> findAllOverlappingCreatedByUserId(
            @Param("userId") Long userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );


}

