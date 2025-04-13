package ki.agh.aghub.controller;

import ki.agh.aghub.dto.AvailabilityDTO;
import ki.agh.aghub.dto.request.AvailabilityRequest;
import ki.agh.aghub.service.AvailabilityService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {
    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping("/find")
    public List<AvailabilityDTO> find(@RequestBody AvailabilityRequest request) {
        return availabilityService.findAllAvailabilities(request.usersId(), request.startDate(), request.endDate(),request.minDuration());
    }
}
