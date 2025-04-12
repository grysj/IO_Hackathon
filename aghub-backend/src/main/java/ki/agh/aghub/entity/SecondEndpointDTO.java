package ki.agh.aghub.entity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SecondEndpointDTO {

    private UsersService usersService;

    public SecondEndpointController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/second/{email}/{password}")
    public SecondEndpointDTO get

}
