package ki.agh.aghub.repository;

import ki.agh.aghub.model.Unavaiability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnavailabilityRepository extends JpaRepository<Unavaiability, Long> {
    // Custom query methods can be defined here if needed
}
