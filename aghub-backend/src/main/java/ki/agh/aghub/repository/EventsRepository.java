package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface EventsRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e JOIN e.participants p " +
       "WHERE p.id = :userId AND DATE(e.date_start) = :date")
    List<Event> findByUserIdAndStartDate(Long userId, LocalDate date);
}
