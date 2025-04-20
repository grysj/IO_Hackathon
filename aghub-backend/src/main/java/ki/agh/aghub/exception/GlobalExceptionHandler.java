package ki.agh.aghub.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<?> handleEmailAlreadyUsed(EmailAlreadyUsedException ex) {
        return errorResponse("email", ex.getMessage(), HttpStatus.CONFLICT);
    }
    @ExceptionHandler(UsersNotFoundException.class)
    public ResponseEntity<?> handleParticipantsNotFound(UsersNotFoundException ex) {
        return errorResponse("users", ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UsernameAlreadyUsedException.class)
    public ResponseEntity<?> handleUsernameAlreadyUsed(UsernameAlreadyUsedException ex) {
        return errorResponse("username", ex.getMessage(), HttpStatus.CONFLICT);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UserNotFoundException ex) {
        return errorResponse("user", ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PoiNotFoundException.class)
    public ResponseEntity<?> handlePoiNotFound(PoiNotFoundException ex) {
        return errorResponse("poi", ex.getMessage(), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<?> handleInvalidCredentials(InvalidCredentialsException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    private ResponseEntity<?> errorResponse(String field, String message, HttpStatus status) {
        Map<String, String> error = new HashMap<>();
        error.put("errorField", field);
        error.put("errorMessage", message);
        return ResponseEntity.status(status).body(error);
    }
}
