package ki.agh.aghub.controller;

import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.model.Role;
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
    public UserDTO saveUser(@RequestBody UserDTO userDTO) {
        return this.usersService.saveUser(userDTO, new Role(1L, "Admin"));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        this.usersService.deleteUser(id);
    }

//    @GetMapping("/{poi_id}/{day}")
//    public List<String> getUsersByPOIAndByDay(@PathVariable Long poi_id, @PathVariable String day) {
//        return this.usersService.getUsersByPOIAndByDay(poi_id, day);
//
//    }

}
