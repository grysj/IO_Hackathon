package ki.agh.aghub.dto;

import java.util.List;

public class FifthEndpointDTO {

    private List<FriendsDTO> friends;

    public FifthEndpointDTO(List<FriendsDTO> friends) {
        this.friends = friends;
    }

    public List<FriendsDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<FriendsDTO> friends) {
        this.friends = friends;
    }
}
