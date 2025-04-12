package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FriendsDTO;
import ki.agh.aghub.entity.FriendsRequestDTO;
import ki.agh.aghub.service.UsersService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/friends")
public class SeventhEndpointController {

    private UsersService usersService;

    public SeventhEndpointController(UsersService friendsService) {
        this.usersService = usersService;
    }

    @PostMapping("")
    public Map<String, String> addFriend(@RequestBody FriendsRequestDTO friendsRequestDTO) {
        String result = this.usersService.addFriend(Long.valueOf(friendsRequestDTO.getIdA()), Long.valueOf(friendsRequestDTO.getIdB()));
        return Map.of("message", result);
    }
}
