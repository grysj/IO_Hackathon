package ki.agh.aghub.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class FirstEndpointController {

//    private UsersService usersService;

    public FirstEndpointController() {

    }

    @GetMapping("/first/{poi_id}/{day}")
    public FirstEndpointDTO getUsersByPOIAndByDay(@PathVariable String poi_id, @PathVariable Integer day) {
        FirstEndpointDTO firstEndpointDTO = this.usersService.getUsersByPOIAndByDay(poi_id, day);
        return FirstEndpointDTO;
    }
}
