package ki.agh.aghub.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {

    @Id
    private Long id;
    private String description;

    public Role(Long id, String description) {
        this.id = id;
        this.description = description;
    }

}
