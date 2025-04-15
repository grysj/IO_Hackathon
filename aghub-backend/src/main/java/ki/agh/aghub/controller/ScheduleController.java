package ki.agh.aghub.controller;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.dto.CalendarDTO;
import ki.agh.aghub.dto.EventDTO;
import ki.agh.aghub.dto.UnavailabilityDTO;
import ki.agh.aghub.dto.request.ScheduleRequest;
import ki.agh.aghub.service.ClassesService;
import ki.agh.aghub.service.EventService;
import ki.agh.aghub.service.UnavailabilitiesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private EventService eventsService;
    private ClassesService classesService;
    private UnavailabilitiesService unavailabilitiesService;

    public ScheduleController(
        EventService eventsService, 
        ClassesService classesService, 
        UnavailabilitiesService unavailabilitiesService
    ) {
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilitiesService = unavailabilitiesService;
    }

    @PostMapping("")
    public CalendarDTO getScheduleByUserAndDate(
            @RequestBody ScheduleRequest scheduleRequest
            ) {
        List<EventDTO> events = this.eventsService.getUserEventsByDate(scheduleRequest.id(), scheduleRequest.dateStart(), scheduleRequest.dateEnd());
        List<ClassesDTO> classes = this.classesService.getUserClassesByDate(scheduleRequest.id(), scheduleRequest.dateStart(), scheduleRequest.dateEnd());
        List<UnavailabilityDTO> unavailability = this.unavailabilitiesService.getUserUnavailabilitiesByDate(scheduleRequest.id(), scheduleRequest.dateStart(), scheduleRequest.dateEnd());

        return new CalendarDTO(events, classes, unavailability);
    }

}
