package ki.agh.aghub.repository;

import ki.agh.aghub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersRepository extends JpaRepository<User, Long> {

    public List<User> findAll();

    public List<User> getUsersByPOIAndByDay();

    public User getUserByMail();

}
