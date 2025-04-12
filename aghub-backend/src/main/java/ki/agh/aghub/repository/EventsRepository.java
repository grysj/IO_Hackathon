package ki.agh.aghub.repository;

import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
