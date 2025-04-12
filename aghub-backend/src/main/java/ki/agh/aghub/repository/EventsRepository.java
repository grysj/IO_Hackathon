package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface EventsRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e JOIN e.participants p " +
            "WHERE p.id = :userId AND e.dateStart >= :now")
    List<Event> findUpcomingEventsByUserId(@Param("userId") Long userId,
                                           @Param("now") LocalDateTime now);

}

