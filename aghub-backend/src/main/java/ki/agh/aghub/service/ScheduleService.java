package ki.agh.aghub.service;

import ki.agh.aghub.dto.*;
import ki.agh.aghub.model.User;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {
    private final UsersRepository usersRepository;
    private final EventService eventsService;
    private final ClassesService classesService;
    private final UnavailabilitiesService unavailabilitiesService;

    public ScheduleService( UsersRepository usersRepository, EventService eventsService, ClassesService classesService, UnavailabilitiesService unavailabilitiesService) {
        this.usersRepository = usersRepository;
        this.eventsService = eventsService;
        this.classesService = classesService;
        this.unavailabilitiesService = unavailabilitiesService;
    }
    public CalendarDTO getScheduleByDate(Long userId, LocalDateTime dateStart, LocalDateTime dateEnd) {
        List<EventDTO> events = eventsService.getUserEventsByDate(userId, dateStart, dateEnd);
        events.addAll(eventsService.getUserCreatedEventsByDate(userId, dateStart, dateEnd));
        List<ClassesDTO> classes = classesService.getUserClassesByDate(userId, dateStart, dateEnd);
        List<UnavailabilityDTO> unavailability = unavailabilitiesService.getUserUnavailabilitiesByDate(userId, dateStart, dateEnd);

        return new CalendarDTO(events, classes, unavailability);
    }
    public List<UserCalendarDTO> getAllSchedulesByDate(List<Long> usersId, LocalDateTime dateStart, LocalDateTime dateEnd){
        List<UserCalendarDTO> calendars = new ArrayList<>();
        for(Long userId : usersId){
            Optional<User> optionalUser = usersRepository.findById(userId);
            if(optionalUser.isPresent()){
                UserDTO user = UserDTO.fromUser(optionalUser.get());
                CalendarDTO calendar = getScheduleByDate(userId, dateStart, dateEnd);
                calendars.add(new UserCalendarDTO(user, calendar));
            }
        }
        return calendars;
    }
}
