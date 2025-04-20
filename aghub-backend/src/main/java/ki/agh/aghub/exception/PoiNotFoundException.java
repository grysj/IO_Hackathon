package ki.agh.aghub.exception;

public class PoiNotFoundException extends RuntimeException{
    public PoiNotFoundException(Long id) {super("POI with id " + id + " not found");}
}
