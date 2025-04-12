package ki.agh.aghub.controller;

import jakarta.validation.Valid;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.dto.request.LoginRequest;
import ki.agh.aghub.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @GetMapping("/if")
    public Boolean ifCorrectPassword(@RequestBody LoginRequest loginRequest) {
        User user = this.usersService.getUserByMail(loginRequest.getMail());
        if(user.getPassword() == loginRequest.getPassword()) {
            return true;
        }
        return false;
    }
}
