package ki.agh.aghub.controller;


import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.dto.request.AddFriendRequest;
import ki.agh.aghub.service.UsersService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

    private UsersService usersService;

    public FriendsController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/{id}")
    public List<UserDTO> getFriendsOfId(@PathVariable Long id) {
        return this.usersService.getUsersFriends(id);
    }
    @PostMapping("/add")
    public Map<String, String> addFriend(@RequestBody AddFriendRequest addFriendRequest) {
        String result = this.usersService.addFriend(
            addFriendRequest.user(), addFriendRequest.friend()
        );
        return Map.of("message", result);
    }
    @GetMapping("new/{id}")
    public List<UserDTO> findNotFriends(@PathVariable Long id) {
        return this.usersService.getNotFriends(id);
    }
}
