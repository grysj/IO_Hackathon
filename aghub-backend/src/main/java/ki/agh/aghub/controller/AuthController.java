package ki.agh.aghub.controller;

import jakarta.validation.Valid;
import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.dto.request.LoginRequest;
import ki.agh.aghub.dto.request.RegisterRequest;
import ki.agh.aghub.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {
    private UsersService usersService;

    public AuthController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginRequest) {
        UserDTO userDTO = usersService.login(loginRequest.email(), loginRequest.password());
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody RegisterRequest request) {
        UserDTO userDTO = usersService.register(request);
        return ResponseEntity.ok(userDTO);
    }
}
