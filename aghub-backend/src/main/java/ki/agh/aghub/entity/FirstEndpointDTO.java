package ki.agh.aghub.entity;

import java.util.List;

public class FirstEndpointDTO {

    private List<String> usernames;

    public FirstEndpointDTO(List<String> usernames) {
        this.usernames = usernames;
    }

    public List<String> getUsernames() {
        return usernames;
    }

    public void setUsernames(List<String> usernames) {
        this.usernames = usernames;
    }
}
