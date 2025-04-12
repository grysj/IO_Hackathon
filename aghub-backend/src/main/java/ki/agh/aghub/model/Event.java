package ki.agh.aghub.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;


@Setter
@Getter
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long event_id;

    private double lat;
    private double lng;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name="created_by")
    private User created_by;

    @ManyToOne
    @JoinColumn(name="poi_id")
    private POI poi_id;

    private LocalDateTime date_start;
    private LocalDateTime date_end;


    @ManyToMany(mappedBy = "events")
    private Set<User> participants;

}
