package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FirstEndpointDTO;
import ki.agh.aghub.entity.LogInDTO;
import ki.agh.aghub.entity.SixthEndpointDTO;
import ki.agh.aghub.entity.UsersDTO;
import ki.agh.aghub.model.User;
import ki.agh.aghub.service.UsersService;
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
        List<UsersDTO> users = this.usersService.findAllUsers();
        SixthEndpointDTO sixthEndpointDTO = new SixthEndpointDTO(users);
        return sixthEndpointDTO;
    }

    @GetMapping("/first/{poi_id}/{day}")
    public FirstEndpointDTO getUsersByPOIAndByDay(@PathVariable Long poi_id, @PathVariable String day) {
        FirstEndpointDTO firstEndpointDTO = this.usersService.getUsersByPOIAndByDay(poi_id, day);
        return firstEndpointDTO;
    }

    @GetMapping("/if")
    public Boolean ifCorrectPassword(@RequestBody LogInDTO logInDTO) {
        User user = this.usersService.getUserByMail(logInDTO.getMail());
        if(user.getPassword() == logInDTO.getPassword()) {
            return true;
        }
        return false;
    }
}
