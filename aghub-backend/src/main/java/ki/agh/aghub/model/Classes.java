package ki.agh.aghub.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "classes")
public class Classes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "poi_id")
    private POI poi;

    private LocalDateTime date_start;
    private LocalDateTime date_end;

    private String name;
    private String room;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
