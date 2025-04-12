package ki.agh.aghub.controller;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.dto.EventsDTO;
import ki.agh.aghub.dto.CalendarDTO;
import ki.agh.aghub.dto.UnavailabilityDTO;
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

    public ScheduleController(EventService eventsService, ClassesService classesService, UnavailabilitiesService unavailabilitiesService) {
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilitiesService = unavailabilitiesService;
    }

    @GetMapping("/schedule/{user_id}/{date}")
    public CalendarDTO getScheduleByUserAndDate(@PathVariable String user_id, @PathVariable LocalDateTime date) {
        List<EventsDTO> events = this.eventsService.getUserEventsByDate(user_id, date);
        List<ClassesDTO> classes = this.classesService.getUserClassesByDate(user_id, date);
        List<UnavailabilityDTO> unavailability = this.unavailabilitiesService.getUserUnavailabilitiesByDate(user_id, date);

        CalendarDTO calendarDTO = new CalendarDTO(events, classes, unavailability);
        return calendarDTO;
    }

}
