package ki.agh.aghub.exception;

public class UsersNotFoundException extends RuntimeException {

    public UsersNotFoundException(int expected, int found) {
        super("Expected " + expected + " users, but found " + found);
    }

}
