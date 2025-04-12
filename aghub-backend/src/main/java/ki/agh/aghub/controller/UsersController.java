package ki.agh.aghub.controller;

import ki.agh.aghub.dto.request.LoginRequest;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.model.Role;
import ki.agh.aghub.model.User;
import ki.agh.aghub.service.UsersService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("")
    public List<UserDTO> getAllUsers() {
        return this.usersService.findAllUsers();
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return this.usersService.findByIdUser(id);
    }

    @PostMapping("")
    public void addUser(@RequestBody UserDTO userDTO, Role role) {
        this.usersService.saveUser(userDTO, role);
    }

    @GetMapping("/{poi_id}/{day}")
    public List<String> getUsersByPOIAndByDay(@PathVariable Long poi_id, @PathVariable String day) {
        return this.usersService.getUsersByPOIAndByDay(poi_id, day);

    }

    @GetMapping("/if")
    public Boolean ifCorrectPassword(@RequestBody LoginRequest loginRequest) {
        User user = this.usersService.getUserByMail(loginRequest.getMail());
        if(user.getPassword() == loginRequest.getPassword()) {
            return true;
        }
        return false;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody UserDTO userDTO) {

    }
}
