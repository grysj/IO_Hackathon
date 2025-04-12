package ki.agh.aghub.repository;

import ki.agh.aghub.model.POI;
import ki.agh.aghub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {

    List<User> findAll();

    @Query("SELECT DISTINCT c.user FROM Classes c " +
           "WHERE c.poi = :poi " +
           "AND c.date_start BETWEEN :startOfDay AND :endOfDay")
    List<User> getUsersByPOIAndByDay(@Param("poi") POI poi,
                                     @Param("startOfDay") LocalDateTime startOfDay,
                                     @Param("endOfDay") LocalDateTime endOfDay);

    User findByMail(String mail);
}

