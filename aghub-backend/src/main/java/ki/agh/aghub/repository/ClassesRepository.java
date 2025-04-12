package ki.agh.aghub.repository;
import ki.agh.aghub.model.Class;
import ki.agh.aghub.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassesRepository extends JpaRepository<Class, Long> {

    public List<Class> findAll();

    public List<Class> findClassesByUserAndDate();

}
