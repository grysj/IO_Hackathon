package ki.agh.aghub.rest;

import ki.agh.aghub.entity.ClassesDTO;
import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.entity.ThirdEndpointDTO;
import ki.agh.aghub.entity.UnavailabilityDTO;
import ki.agh.aghub.service.ClassesService;
import ki.agh.aghub.service.EventsService;
import ki.agh.aghub.service.UnavailabilitiesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ScheduleController {

    private EventsService eventsService;

    private ClassesService classesService;

    private UnavailabilitiesService unavailabilitiesService;

    public ScheduleController(EventsService eventsService, ClassesService classesService, UnavailabilitiesService unavailabilitiesService) {
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilitiesService = unavailabilitiesService;
    }

    @GetMapping("/schedule/{user_id}/{date}")
    public ThirdEndpointDTO getScheduleByUserAndDate(@PathVariable String user_id, @PathVariable String date) {
        List<EventsDTO> events = this.eventsService.getUserEventsByDate(user_id, date);
        List<ClassesDTO> classes = this.classesService.getUserClassesByDate(user_id, date);
        List<UnavailabilityDTO> unavailability = this.unavailabilitiesService.getUserUnavailabilitiesByDate(user_id, date);

        ThirdEndpointDTO thirdEndpointDTO = new ThirdEndpointDTO(events, classes, unavailability);
        return thirdEndpointDTO;
    }

}
