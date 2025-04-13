package ki.agh.aghub.service;

import ki.agh.aghub.dto.ClassesDTO;
import jakarta.persistence.EntityNotFoundException;

import ki.agh.aghub.mapper.ClassesMapper;
import ki.agh.aghub.model.Classes;

import ki.agh.aghub.repository.ClassesRepository;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;

import ki.agh.aghub.usos.ParseIcsToJson;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// importy do parsowania usosa
import ki.agh.aghub.usos.ParseIcsToJson.Event;
import java.time.format.DateTimeFormatter;

@Service
public class ClassesService {

    private final ClassesRepository classesRepository;

    // zhardkodowane kordy lokacji
    private static final Map<String, double[]> LOCATION_COORDINATES = Map.of(
            "ul. Kawiory 40, 30-055 Kraków, Polska", new double[]{50.067882830735854, 19.909353710436637},
            "ul. Kawiory 21, 30-055 Kraków, Polska", new double[]{50.06811457595547, 19.91242912733053}
    );

    // Zhardkodowana mapa: lokalizacja z ICS → ID punktu POI
    private static final Map<String, Long> LOCATION_TO_POI_ID = Map.of(
            "ul. Kawiory 40, 30-055 Kraków, Polska", 1L,
            "ul. Kawiory 21, 30-055 Kraków, Polska", 2L
    );



    public ClassesService(
        ClassesRepository classesRepository, 
        PoiRepository poiRepository, 
        UsersRepository usersRepository
    ) { 
        this.classesRepository = classesRepository;
    }

    public List<ClassesDTO> findAllClasses() {
        return this.classesRepository.findAll().stream()
            .map(ClassesDTO::fromClasses)
            .collect(Collectors.toList());
    }

    public ClassesDTO findByIdClasses(Long id) {
        return this.classesRepository.findById(id)
                .map(ClassesDTO::fromClasses)
                .orElseThrow(() -> 
                    new EntityNotFoundException("Class not found with id: " + id)
                );
    }

    public ClassesDTO saveClasses(ClassesDTO classesDTO) {
        return ClassesDTO.fromClasses(classesRepository.save(ClassesDTO.toClasses(classesDTO)));
    }

    public void deleteClasses(Long id) {
        this.classesRepository.deleteById(id);
    }

    public List<ClassesDTO> getUserClassesByDate(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return classesRepository.findByUserIdAndDateStartBetween(userId, startDate, endDate)
            .stream()
            .map(ClassesDTO::fromClasses)
            .collect(Collectors.toList());
    }

    // Mapowanie planu do DataMappera

    public void mapUsosPlanToDto(String url, Long userId) {

        try {

            System.setProperty("net.fortuna.ical4j.timezone.cache.impl", "net.fortuna.ical4j.util.MapTimeZoneCache");

            // Parsowanie ICS z podanego URL
            List<Event> events = ParseIcsToJson.parseFromUrl(url);
            System.out.println("Liczba zdarzeń: " + events.size());

            // Hardkodowana mapa: lokalizacja z ICS => ID POI
//            final Map<String, Long> LOCATION_TO_POI_ID = Map.of(
//                    "ul. Kawiory 40, 30-055 Kraków, Polska", 1L,
//                    "ul. Kawiory 21, 30-055 Kraków, Polska", 2L
//            );

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss");

            // Mapowanie eventów na listę ClassesDTO
            List<ClassesDTO> dtos = events.stream()
                    .map(event -> {
                        // 1. Nazwa = summary
                        String name = event.getSummary();

                        // 2. Room = parseRoom z description
                        String rawDesc = event.getDescription();
                        String roomParsed = parseRoom(rawDesc); // nasza metoda

                        // 3. Daty
                        LocalDateTime startDate = LocalDateTime.parse(event.getDtstart(), formatter);
                        LocalDateTime endDate = LocalDateTime.parse(event.getDtend(), formatter);

                        // 4. POI ID – sprawdzamy location
                        Long poiId = LOCATION_TO_POI_ID.getOrDefault(event.getLocation(), null);

                        return new ClassesDTO(
                                name,
                                roomParsed,
                                startDate,
                                endDate,
                                poiId,
                                userId
                        );
                    })
                    .toList();


            // Obliczenie najwcześniejszej daty zajęć w otrzymanym batchu
            dtos.stream()
                    .map(ki.agh.aghub.dto.ClassesDTO::startDate)
                    .min(LocalDateTime::compareTo)
                    .ifPresent(earliestDate ->
                            System.out.println("Najwcześniejsza data zajęć: " + earliestDate)
                    );

            // DEBUG: wypisanie każdej DTO w konsoli
            dtos.forEach(dto -> System.out.println("DTO: " + dto));


            // Mapowanie DTO na encje przy użyciu mappera
            List<Classes> classesEntities = dtos.stream()
                    .map(dto -> classesMapper.fromDto(dto))
                    .collect(Collectors.toList());

            // Zapis encji do bazy danych za pomocą repository
            classesRepository.saveAll(classesEntities);

            System.out.println("Zapisano " + classesEntities.size() + " encji Classes do bazy.");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    // do wyciagania numeru sali z jsona
    private String parseRoom(String description) {
        if (description == null) return null;

        String marker = "Sala: ";
        int idx = description.indexOf(marker);
        if (idx == -1) {
            // nie znaleziono "Sala: "
            return null;
        }

        int startIndex = idx + marker.length();
        int endIndex = description.indexOf("\n", startIndex);
        if (endIndex == -1) {
            endIndex = description.length();
        }

        return description.substring(startIndex, endIndex).trim();
    }
}