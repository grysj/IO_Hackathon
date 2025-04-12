package ki.agh.aghub.rest;

import ki.agh.aghub.entity.ClassesDTO;
import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.model.Class;
import ki.agh.aghub.entity.ThirdEndpointDTO;
import ki.agh.aghub.entity.UnavailabilityDTO;
import ki.agh.aghub.model.Event;
import ki.agh.aghub.model.Unavailability;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ki.agh.aghub.service.ClassesService;
import ki.agh.aghub.service.EventsService;
import ki.agh.aghub.service.UnavailabilitiesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ThirdEndpointController {

    private EventsService eventsService;

    private ClassesService classesService;

    private UnavailabilitiesService unavailabilityService;

    public ThirdEndpointController(EventsService eventsService, ClassesService classesService, UnavailabilitiesService unavailabilityService) {
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilityService = unavailabilityService;
    }

    @GetMapping("/third/{user_id}/{date}")
    public ThirdEndpointDTO getScheduleByUserAndDate(@PathVariable String user_id, @PathVariable String date) {


        List<Event> events = this.eventsService.getUserEventsByDate(user_id, date);
        List<Class> classes = this.classesService.getUserClassesByDate(user_id, date);
        List<Unavailability> unavailability = this.unavailabilityService.getUserUnavailabilitiesByDate(user_id, date);

        List<EventsDTO> eventDTOs = events.stream().map(event -> {
            EventsDTO dto = new EventsDTO(
                    event.getName(),
                    event.getDescription(),
                    event.getDate_start().toString(),
                    event.getDate_end().toString(),
                    event.getLat(),
                    event.getLng(),
                    event.getCreated_by() != null ? event.getCreated_by().getId().intValue() : null
            );
            if (event.getPoi_id() != null) {
                dto.setPoiId(event.getPoi_id().getId().intValue());
            }
            return dto;
        }).toList();

        List<ClassesDTO> classDTOs = classes.stream().map(c ->
                new ClassesDTO(
                        c.getName(),
                        c.getDate_start().toString(),
                        c.getDate_end().toString(),
                        c.getRoom(),
                        c.getPoi() != null ? c.getPoi().getId().intValue() : null
                )
        ).toList();

        List<UnavailabilityDTO> unavailabilityDTOs = unavailability.stream().map(u ->
                new UnavailabilityDTO(
                        u.getName(),
                        u.getDescription(),
                        u.getDate_start().toString(),
                        u.getDate_end().toString()
                )
        ).toList();
        ThirdEndpointDTO thirdEndpointDTO = new ThirdEndpointDTO(eventDTOs, classDTOs, unavailabilityDTOs);
        return thirdEndpointDTO;
    }

}
