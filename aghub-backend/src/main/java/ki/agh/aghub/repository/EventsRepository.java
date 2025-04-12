package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventsRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e JOIN e.participants p " +
           "WHERE p.id = :userId AND DATE(e.date_start) = :date")
    List<Event> findByUserIdAndStartDate(@Param("userId") Long userId, @Param("date") LocalDate date);

    // Znajdź eventy użytkownika (dowolne)
    @Query("SELECT e FROM Event e JOIN e.participants p WHERE p.id = :userId")
    List<Event> findEventsByUserAndDate(@Param("userId") Long userId);

}

