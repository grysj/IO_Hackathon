package ki.agh.aghub.repository;

import ki.agh.aghub.entity.FriendsDTO;
import ki.agh.aghub.model.Friend;

import java.util.List;

public interface FriendsRepository {

    public List<FriendsDTO> findFriendsByUserId();

}
