package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsRepository extends JpaRepository<Event, Long> {

    public List<Event> findAll();

    public List<Event> findEventsByUserAndDate();

    public List<Event> findAcceptedEventsByUser();

    public List<Event> findDeclinedEventsByUser();

    public List<Event> findPendingEventsByUser();

}
