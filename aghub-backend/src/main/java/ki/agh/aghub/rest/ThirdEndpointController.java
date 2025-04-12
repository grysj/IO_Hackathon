package ki.agh.aghub.rest;

import ki.agh.aghub.entity.ClassesDTO;
import ki.agh.aghub.entity.EventsDTO;
import ki.agh.aghub.entity.ThirdEndpointDTO;
import ki.agh.aghub.entity.UnavailabilityDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ThirdEndpointController {

    private EventsService eventsService;

    private ClassesService classesService;

    private UnavailabilityService unavailabilityService;

    public ThirdEndpointController(EventsService eventsService, ClassesService classesService, UnavailabilityService unavailabilityService) {
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilityService = unavailabilityService;
    }

    @GetMapping("/third/{user_id}/{date}")
    public ThirdEndpointDTO getScheduleByUserAndDate(@PathVariable String user_id, @PathVariable String date) {
        List<EventsDTO> events = this.eventsService.;
        List<ClassesDTO> classes = this.classesService.;
        List<UnavailabilityDTO> unavailability = this.unavailabilityService.;

        ThirdEndpointDTO thirdEndpointDTO = new ThirdEndpointDTO(events, classes, unavailability);
        return thirdEndpointDTO;
    }

}
