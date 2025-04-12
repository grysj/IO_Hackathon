package ki.agh.aghub.repository;

import ki.agh.aghub.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
