package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FirstEndpointDTO;
import ki.agh.aghub.entity.LogInDTO;
import ki.agh.aghub.entity.SixthEndpointDTO;
import ki.agh.aghub.entity.UsersDTO;
import ki.agh.aghub.model.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("")
    public SixthEndpointDTO getAllUsers() {
        List<UsersDTO> users = this.usersService.;
        SixthEndpointDTO sixthEndpointDTO = new SixthEndpointDTO(users);
        return sixthEndpointDTO;
    }

    @GetMapping("/first/{poi_id}/{day}")
    public FirstEndpointDTO getUsersByPOIAndByDay(@PathVariable String poi_id, @PathVariable Integer day) {
        FirstEndpointDTO firstEndpointDTO = this.usersService.getUsersByPOIAndByDay(poi_id, day);
        return FirstEndpointDTO;
    }

    @GetMapping()
    public Boolean ifCorrectPassword(@RequestBody LogInDTO logInDTO) {
        User user = this.usersService.getUserByMail();
        if(user.getPassword().equals(logInDTO.getPassword())) {
            return true;
        }
        return false;
    }
}
