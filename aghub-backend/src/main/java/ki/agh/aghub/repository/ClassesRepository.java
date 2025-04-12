package ki.agh.aghub.repository;
import ki.agh.aghub.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ClassesRepository extends JpaRepository<Class, Long> {
    @Query("SELECT c FROM Class c WHERE c.user.id = :userId AND c.dateStart BETWEEN :startOfDay AND :endOfDay")
    List<Class> findByUserIdAndDate(@Param("userId") Long userId,
                                    @Param("startOfDay") LocalDateTime startOfDay,
                                    @Param("endOfDay") LocalDateTime endOfDay);

}
