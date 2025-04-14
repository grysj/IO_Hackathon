package ki.agh.aghub.controller;

import ki.agh.aghub.dto.UnavailabilityDTO;
import ki.agh.aghub.service.UnavailabilitiesService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/unavailability")
public class UnavailabilityController {

    private UnavailabilitiesService unavailabilitiesService;

    public UnavailabilityController(UnavailabilitiesService unavailabilitiesService) {
        this.unavailabilitiesService = unavailabilitiesService;
    }

    @PostMapping("")
    public UnavailabilityDTO saveUnavailability(UnavailabilityDTO unavailabilityDTO) {
        return this.unavailabilitiesService.saveUnavailability(unavailabilityDTO);
    }



}
