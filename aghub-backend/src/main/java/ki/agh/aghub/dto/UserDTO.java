package ki.agh.aghub.dto;

import ki.agh.aghub.model.Role;
import ki.agh.aghub.model.User;
import lombok.Getter;
import lombok.Setter;


public record UserDTO (
        Long id,
        String username,
        String email
){
    public static UserDTO fromUser(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }
    public static User toUser(UserDTO userDTO, Role role) {
        return User.builder()
                .email(userDTO.email())
                .username(userDTO.username())
                .role(role)
                .build();
    }
}
