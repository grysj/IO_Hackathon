package ki.agh.aghub.config;

import ki.agh.aghub.model.Classes;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.model.POI;
import ki.agh.aghub.model.User;
import ki.agh.aghub.repository.*;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder {

    public DatabaseSeeder() {
    }

    @Bean
    CommandLineRunner initDatabase(
            ClassesRepository classRepo,
            RoleRepository roleRepo,
            EventRepository eventRepo,
            PoiRepository poiRepo,
            UsersRepository userRepo) {
        return args -> {

            // // Create POI
            // POI poi = new POI();
            // poi.setName("Main Campus");
            // poi.setLat(50.06143);
            // poi.setLng(19.93658);
            // poiRepo.save(poi);

            // D-12
            // POI poi2 = new POI();
            // poi2.setName("D-12");
            // poi2.setLat(50.067882830735854);
            // poi2.setLng(19.909353710436637);
            // poiRepo.save(poi2);


            // // D-17
            // POI poi3 = new POI();
            // poi3.setName("D-17");
            // poi3.setLat(50.06811457595547);
            // poi3.setLng(19.91242912733053);
            // poiRepo.save(poi3);

            // User user1 = User.builder()
            //     .email("asd@asd.asd")
            //     .username("asd")
            //     .password("password")
            //     .build();
            // userRepo.save(user1);
            

            // Classes klass = new Classes();
            // klass.setName("AI Fundamentals");
            // klass.setRoom("Room 101");
            // klass.setDateStart(LocalDateTime.now().plusDays(1));
            // klass.setDateEnd(LocalDateTime.now().plusDays(1).plusHours(2));
            // klass.setPoi(poi);
            // klass.setUser(user1);
            // classRepo.save(klass);

            // // Create Event
            // Event event = Event.builder()
            //         .latitude(50.06143)
            //         .longitude(19.93658)
            //         .name("AGH Open Day")
            //         .description("An event for prospective students.")
            //         .createdBy(user1)
            //         .poi(poi)
            //         .dateStart(LocalDateTime.now())
            //         .dateEnd(LocalDateTime.now().plusHours(2))
            //         .participantsId(Set.of(user1))
            //         .build();
            // eventRepo.save(event);
        };

    }
}