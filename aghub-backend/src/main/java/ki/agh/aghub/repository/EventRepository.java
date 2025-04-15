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
            "AND e.dateStart >= :dateStart " +
            "AND e.dateStart <= :dateEnd")
    List<Event> findEventsByUserIdBetweenDates(@Param("userId") Long userId,
                                               @Param("dateStart") LocalDateTime dateStart,
                                               @Param("dateEnd") LocalDateTime dateEnd);

}

