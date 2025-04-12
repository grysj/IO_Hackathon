package ki.agh.aghub.repository;

import ki.agh.aghub.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
