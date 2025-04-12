package ki.agh.aghub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name= "unavailabilities")
public class Unavailability {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime date_start;
    private LocalDateTime date_end;
    private String name;
    private String description;

}
