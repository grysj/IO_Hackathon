package ki.agh.aghub.dto;

import java.util.List;

public class SixthEndpointDTO {

    private List<UsersDTO> users;

    public SixthEndpointDTO(List<UsersDTO> users) {
        this.users = users;
    }

    public List<UsersDTO> getUsers() {
        return users;
    }

    public void setUsers(List<UsersDTO> users) {
        this.users = users;
    }
}
