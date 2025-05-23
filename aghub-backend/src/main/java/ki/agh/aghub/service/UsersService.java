package ki.agh.aghub.service;


import ki.agh.aghub.dto.UserDTO;
import ki.agh.aghub.dto.request.RegisterRequest;
import ki.agh.aghub.exception.EmailAlreadyUsedException;
import ki.agh.aghub.exception.InvalidCredentialsException;
import ki.agh.aghub.exception.UserNotFoundException;
import ki.agh.aghub.exception.UsernameAlreadyUsedException;
// import ki.agh.aghub.model.POI;
import ki.agh.aghub.model.Role;
import ki.agh.aghub.model.User;
// import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    // private final PoiRepository poiRepository;
    private final PasswordEncoder passwordEncoder;

    // public UsersService(UsersRepository usersRepository, PoiRepository poiRepository, PasswordEncoder passwordEncoder) {
    //     this.usersRepository = usersRepository;
    //     this.poiRepository = poiRepository;
    //     this.passwordEncoder = passwordEncoder;
    // }

    public UsersService(UsersRepository usersRepository, PasswordEncoder passwordEncoder) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> findAllUsers() {
        return usersRepository.findAll().stream()
            .map(UserDTO::fromUser)
            .collect(Collectors.toList());
    }

    public UserDTO findByIdUser(Long id) {
        return usersRepository.findById(id)
            .map(UserDTO::fromUser)
            .orElseThrow(() -> 
                new EntityNotFoundException("User not found with id: " + id)
            );
    }

    public UserDTO saveUser(UserDTO userDTO, Role role) {
        return UserDTO.fromUser(this.usersRepository.save(UserDTO.toUser(userDTO, role)));
    }

    public void deleteUser(Long id) {
        this.usersRepository.deleteById(id);
    }


//    public List<String> getUsersByPOIAndByDay(Long poi_id, String dayString) {
//        LocalDate date = LocalDate.parse(dayString); // format: yyyy-MM-dd
//        LocalDateTime startOfDay = date.atStartOfDay();
//        LocalDateTime endOfDay = date.atTime(23, 59, 59);
//        POI poi = poiRepository.findById(poi_id).orElse(null);
//        List<User> users = usersRepository.findDistinctByPoiAndDateStartBetween(poi, startOfDay, endOfDay);
//        List<String> usernames = users.stream()
//                .map(User::getUsername)
//                .collect(Collectors.toList());
//
//        return usernames;
//    }

    public UserDTO login(String email, String password) {
        User user = usersRepository.findByEmail(email)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return UserDTO.fromUser(user);
    }

    public UserDTO register(RegisterRequest request) {
        if (usersRepository.findByEmail(request.email()).isPresent()) {
            throw new EmailAlreadyUsedException(request.email());
        }

        if (usersRepository.findByUsername(request.username()).isPresent()) {
            throw new UsernameAlreadyUsedException(request.username());
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        usersRepository.save(user);

        return UserDTO.fromUser(user);
    }

    public Optional<User> getUserByEmail(String mail) {
        return usersRepository.findByEmail(mail);
    }

    public Optional<User> getUserByUsername(String username) { return usersRepository.findByUsername(username); }

    public String addFriend(Long senderId, Long receiverId) {
        if (senderId.equals(receiverId)) {
            throw new IllegalArgumentException("Cannot add yourself as a friend.");
        }

        User sender = usersRepository.findById(senderId)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        User receiver = usersRepository.findById(receiverId)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        if (sender.getFriends().contains(receiver)) {
            return "Already friends.";
        }

        sender.getFriends().add(receiver);
        receiver.getFriends().add(sender);

        usersRepository.save(sender);
        usersRepository.save(receiver);

        return "Friend added successfully.";
    }

    public List<UserDTO> getUsersFriends(Long poiId) {
        User user = usersRepository.findById(poiId)
            .orElseThrow(() -> 
                new EntityNotFoundException("User not found with id: " + poiId)
            );

        return user.getFriends().stream()
            .map(UserDTO::fromUser)
            .collect(Collectors.toList());

    }
    public List<UserDTO> getNotFriends(Long userId){
        usersRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        return usersRepository.findAllNotFriends(userId).stream().map(UserDTO::fromUser).collect(Collectors.toList());

    }




}
