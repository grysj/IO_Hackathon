package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FirstEndpointDTO;
import ki.agh.aghub.entity.LogInDTO;
import ki.agh.aghub.entity.SixthEndpointDTO;
import ki.agh.aghub.entity.UsersDTO;
import ki.agh.aghub.model.Role;
import ki.agh.aghub.model.User;
import ki.agh.aghub.service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/users")
    public List<UsersDTO> getAllUsers() {
        return this.usersService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public UsersDTO getUserById(@PathVariable Long id) {
        return this.usersService.findByIdUser(id);
    }

    @PostMapping("/users")
    public void addUser(@RequestBody UsersDTO usersDTO, Role role) {
        this.usersService.saveUser(usersDTO, role);
    }

    @GetMapping("/users/first/{poi_id}/{day}")
    public FirstEndpointDTO getUsersByPOIAndByDay(@PathVariable Long poi_id, @PathVariable String day) {
        FirstEndpointDTO firstEndpointDTO = this.usersService.getUsersByPOIAndByDay(poi_id, day);
        return firstEndpointDTO;
    }

    @GetMapping("/users/if")
    public Boolean ifCorrectPassword(@RequestBody LogInDTO logInDTO) {
        User user = this.usersService.getUserByMail(logInDTO.getMail());
        if(user.getPassword() == logInDTO.getPassword()) {
            return true;
        }
        return false;
    }

    @PostMapping("/users/register")
    public void registerUser(@RequestBody UsersDTO usersDTO) {

    }
}
