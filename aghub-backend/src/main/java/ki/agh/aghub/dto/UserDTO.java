package ki.agh.aghub.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public record UserDTO (
        Long id,
        String username,
        String email
){

}
