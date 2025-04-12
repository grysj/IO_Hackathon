package ki.agh.aghub.rest;

import ki.agh.aghub.entity.FifthEndpointDTO;
import ki.agh.aghub.entity.FriendsDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FifthEndpointController {

    private FriendsService friendsService;

    public FifthEndpointController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping("/fifth/{id}")
    public FifthEndpointDTO getFriendsOfId(@PathVariable Integer id) {
        List<FriendsDTO> friends = this.friendsService.;
        FifthEndpointDTO fifthEndpointDTO = new FifthEndpointDTO(friends);
        return fifthEndpointDTO;
    }
}
