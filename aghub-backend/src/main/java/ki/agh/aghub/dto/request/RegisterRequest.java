package ki.agh.aghub.dto.request;

public record RegisterRequest(
        String username,
        String email,
        String password
) {
}
