package ki.agh.aghub.usos;

import ki.agh.aghub.usos.ParseIcsToJson;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DownloadUsosData {

    @PostMapping("/download_usos")
    public ResponseEntity<String> downloadAndParse(@RequestBody Map<String, String> body) {
        System.setProperty("net.fortuna.ical4j.timezone.cache.impl", "net.fortuna.ical4j.util.MapTimeZoneCache");

        String url = body.get("url");
        try {
            List<ParseIcsToJson.Event> events = ParseIcsToJson.parseFromUrl(url);
            String json = ParseIcsToJson.convertEventsToJson(events);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Błąd parsowania ICS: " + e.getMessage());
        }
    }
}
