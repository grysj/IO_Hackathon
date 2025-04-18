package ki.agh.aghub.controller;

import ki.agh.aghub.dto.*;
import ki.agh.aghub.dto.request.ScheduleRequest;
import ki.agh.aghub.dto.request.UsersScheduleRequest;
import ki.agh.aghub.service.ScheduleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(
            ScheduleService scheduleService
    ) {
        this.scheduleService = scheduleService;
    }

    @PostMapping("")
    public CalendarDTO getScheduleByUserAndDate(
            @RequestBody ScheduleRequest scheduleRequest
            ) {
        return scheduleService.getScheduleByDate(scheduleRequest.id(), scheduleRequest.dateStart(), scheduleRequest.dateEnd());
    }



    @PostMapping("/users")
    public List<UserCalendarDTO> getAllUsersScheduleByUserAndDate(
            @RequestBody UsersScheduleRequest usersScheduleRequest
    ){
        return scheduleService.getAllSchedulesByDate(usersScheduleRequest.usersId(), usersScheduleRequest.dateStart(), usersScheduleRequest.dateEnd());
    }

}
