package ki.agh.aghub.entity;

public class FriendsRequestDTO {

    private Integer idA;

    private Integer idB;

    public FriendsRequestDTO(Integer idB, Integer idA) {
        this.idB = idB;
        this.idA = idA;
    }

    public Integer getIdA() {
        return idA;
    }

    public void setIdA(Integer idA) {
        this.idA = idA;
    }

    public Integer getIdB() {
        return idB;
    }

    public void setIdB(Integer idB) {
        this.idB = idB;
    }
}
