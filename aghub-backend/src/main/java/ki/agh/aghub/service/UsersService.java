package ki.agh.aghub.service;


import ki.agh.aghub.dto.FirstEndpointDTO;
import ki.agh.aghub.dto.FriendsDTO;
import ki.agh.aghub.dto.UsersDTO;
import ki.agh.aghub.model.POI;
import ki.agh.aghub.model.Role;
import ki.agh.aghub.model.User;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.repository.UsersRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersService {

    private final UsersRepository usersRepository;
    private final PoiRepository poiRepository;

    public UsersService(UsersRepository usersRepository, PoiRepository poiRepository) {
        this.usersRepository = usersRepository;
        this.poiRepository = poiRepository;
    }

    public List<UsersDTO> findAllUsers() {
        return usersRepository.findAll().stream()
                .map(user -> new UsersDTO(
                        user.getId() != null ? user.getId() : null,
                        user.getUsername(),
                        user.getMail()
                ))
                .collect(Collectors.toList());
    }

    public UsersDTO findByIdUser(Long id) {
        return usersRepository.findById(id)
                .map(user -> new UsersDTO(
                        user.getId() != null ? user.getId() : null,
                        user.getUsername(),
                        user.getMail()
                )).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public void saveUser(UsersDTO usersDTO, Role role) {
        User user = new User();
        user.setId(usersDTO.getId());
        user.setUsername(usersDTO.getUsername());
        user.setMail(usersDTO.getMail());
        user.setRole(role);
        this.usersRepository.save(user);
    }

    public FirstEndpointDTO getUsersByPOIAndByDay(Long poi_id, String dayString) {
        LocalDate date = LocalDate.parse(dayString); // format: yyyy-MM-dd
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);
        POI poi = poiRepository.findById(poi_id).orElse(null);
        List<User> users = usersRepository.getUsersByPOIAndByDay(poi, startOfDay, endOfDay);
        List<String> usernames = users.stream()
                .map(User::getUsername)
                .collect(Collectors.toList());

        return new FirstEndpointDTO(usernames);
    }


    public User getUserByMail(String mail) {
        return usersRepository.findByMail(mail);
    }

    public String addFriend(Long senderId, Long receiverId) {
        if (senderId.equals(receiverId)) {
            return "Cannot add yourself as a friend.";
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

    public List<FriendsDTO> getUsersFriends(Long poi_id) {
        User user = usersRepository.findById(poi_id).orElse(null);

        if (user == null) {
            return List.of();
        }
        List<User> friends = user.getFriends().stream().toList();
        return friends.stream()
                .map(friend -> new FriendsDTO(
                        friend.getId() != null ? friend.getId().intValue() : null,
                        friend.getUsername(),
                        friend.getMail()
                ))
                .collect(Collectors.toList());

    }




}
