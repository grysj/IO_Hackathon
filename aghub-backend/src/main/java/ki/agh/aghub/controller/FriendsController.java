package ki.agh.aghub.controller;

import ki.agh.aghub.dto.FriendsDTO;
import ki.agh.aghub.service.UsersService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

    private UsersService usersService;

    public FriendsController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/{id}")
    public List<FriendsDTO> getFriendsOfId(@PathVariable Long id) {
        return this.usersService.getUsersFriends(id);
    }
}
