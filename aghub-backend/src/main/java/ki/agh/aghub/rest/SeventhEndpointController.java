package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FriendsDTO;
import ki.agh.aghub.entity.FriendsRequestDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/friends")
public class SeventhEndpointController {

    private FriendsService friendsService;

    public SeventhEndpointController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @PostMapping("")
    public Map<String, String> addFriend(@RequestBody FriendsRequestDTO friendsRequestDTO) {
        String result = this.friendsService.;
        return Map.of("message", result);
    }
}
