//package ki.agh.aghub.config;
//
//
//import ki.agh.aghub.model.*;
//
//import ki.agh.aghub.model.Classes;
//import ki.agh.aghub.repository.*;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.time.LocalDateTime;
//import java.util.Set;
//
//@Configuration
//public class DatabaseSeeder {
//
//    public DatabaseSeeder() {}
//
//    @Bean
//    CommandLineRunner initDatabase(
//            ClassesRepository classRepo,
//            RoleRepository roleRepo,
//            EventRepository eventRepo,
//            PoiRepository poiRepo,
//            UsersRepository userRepo) {
//        return args -> {
//            Role role = roleRepo.findByDescription("ADMIN")
//                    .orElseGet(() -> {
//                        Role newRole = new Role();
//                        newRole.setDescription("ADMIN");
//                        return roleRepo.save(newRole);
//                    });
//
//            User user1 = new User();
//            user1.setUsername("john_doe");
//            user1.setPassword("password");
//            user1.setEmail("john@example.com");
//            user1.setRole(role);
//            userRepo.save(user1);
//
//            User user2 = new User();
//            user2.setUsername("jane_doe");
//            user2.setPassword("password");
//            user2.setEmail("jane@example.com");
//            user2.setRole(role);
//            userRepo.save(user2);
//
//            // Add each other as friends
//            user1.setFriends(Set.of(user2));
//            user2.setFriends(Set.of(user1));
//            userRepo.save(user1);
//            userRepo.save(user2);
//
//            // Create POI
//            POI poi = new POI();
//            poi.setName("Main Campus");
//            poi.setLat(50.06143);
//            poi.setLng(19.93658);
//            poiRepo.save(poi);
//
//            // Create Class
//            Classes klass = Classes.builder()
//                .name("AI Fundamentals")
//                .room("Room 101")
//                .dateStart(LocalDateTime.now().plusDays(1))
//                .dateEnd(LocalDateTime.now().plusDays(1).plusHours(2))
//                .poi(poi)
//                .user(user1)
//                .build();
//            classRepo.save(klass);
//
//            // klass.setName("AI Fundamentals");
//            // klass.setRoom("Room 101");
//            // klass.setDateStart(LocalDateTime.now().plusDays(1));
//            // klass.setDateEnd(LocalDateTime.now().plusDays(1).plusHours(2));
//            // klass.setPoi(poi);
//            // klass.setUser(user1);
//            // classRepo.save(klass);
//
//            // Create Event
//            Event event = new Event();
//            event.setName("AI Meetup");
//            event.setDescription("Discussing latest AI trends.");
//            event.setLatitude(poi.getLat());
//            event.setLongitude(poi.getLng());
//            event.setCreatedBy(user2);
//            event.setPoi(poi);
//            event.setDateStart(LocalDateTime.now().plusDays(2));
//            event.setDateEnd(LocalDateTime.now().plusDays(2).plusHours(3));
//            event.setParticipants(Set.of(user1, user2));
//            eventRepo.save(event);
//
//            // Link users to events (optional, for bidirectional consistency)
//            user1.setEvents(Set.of(event));
//            user2.setEvents(Set.of(event));
//            userRepo.save(user1);
//            userRepo.save(user2);
//        };
//    }
//}


import ki.agh.aghub.model.*;

import ki.agh.aghub.model.Classes;
import ki.agh.aghub.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Set;

@Configuration
public class DatabaseSeeder {

    public DatabaseSeeder() {}

    @Bean
    CommandLineRunner initDatabase(
            ClassesRepository classRepo,
            RoleRepository roleRepo,
            EventRepository eventRepo,
            PoiRepository poiRepo,
            UsersRepository userRepo) {
        return args -> {


            // Create POI
            POI poi = new POI();
            poi.setName("Main Campus");
            poi.setLat(50.06143);
            poi.setLng(19.93658);
            poiRepo.save(poi);

            // D-12
            POI poi2 = new POI();
            poi2.setName("D-12");
            poi2.setLat(50.067882830735854);
            poi2.setLng(19.909353710436637);
            poiRepo.save(poi2);


            // D-17
            POI poi3 = new POI();
            poi3.setName("D-17");
            poi3.setLat(50.06811457595547);
            poi3.setLng(19.91242912733053);
            poiRepo.save(poi3);


            // klass.setName("AI Fundamentals");
            // klass.setRoom("Room 101");
            // klass.setDateStart(LocalDateTime.now().plusDays(1));
            // klass.setDateEnd(LocalDateTime.now().plusDays(1).plusHours(2));
            // klass.setPoi(poi);
            // klass.setUser(user1);
            // classRepo.save(klass);

            // Create Event
}

    }
        };