package ki.agh.aghub.rest;

import ki.agh.aghub.entity.SixthEndpointDTO;
import ki.agh.aghub.entity.UsersDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class SixthEndpointController {

    private EventsService eventsService;

    public SixthEndpointController(EventsService eventsService) {
        this.eventsService = eventsService;
    }

    public SixthEndpointDTO getAllUsers() {
        List<UsersDTO> users = this.eventsService.;
        SixthEndpointDTO sixthEndpointDTO = new SixthEndpointDTO(users);
        return sixthEndpointDTO;
    }
}
