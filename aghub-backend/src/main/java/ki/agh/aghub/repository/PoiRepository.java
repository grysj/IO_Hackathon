package ki.agh.aghub.repository;

import ki.agh.aghub.model.POI;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoiRepository extends JpaRepository<POI, Long> {
}
