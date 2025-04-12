package ki.agh.aghub.rest;

import ki.agh.aghub.entity.SixthEndpointDTO;
import ki.agh.aghub.entity.UsersDTO;
import ki.agh.aghub.service.UsersService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class SixthEndpointController {

    private UsersService usersService;

    public SixthEndpointController(UsersService usersService) {
        this.usersService = usersService;
    }

    public SixthEndpointDTO getAllUsers() {
        List<Users> users = this.usersService.getAllUsers();

        // Convert Users to UsersDTO

        SixthEndpointDTO sixthEndpointDTO = new SixthEndpointDTO(users);
        return sixthEndpointDTO;
    }
}
