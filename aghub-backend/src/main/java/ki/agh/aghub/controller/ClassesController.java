package ki.agh.aghub.controller;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.service.ClassesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/classes")
public class ClassesController {

    private ClassesService classesService;

    public ClassesController(ClassesService classesService) {
        this.classesService = classesService;
    }

    @PostMapping()
    public void saveClass(@RequestBody ClassesDTO classesDTO) {
        this.classesService.saveClasses(classesDTO);
    }



    // Nowy endpoint: przyjmuje url oraz userId do zrobienia planu
    @PostMapping("/import_usos")
    public ResponseEntity<String> importUsosPlan(@RequestBody Map<String, String> payload) {
        String url = payload.get("url");
        Long userId = Long.parseLong(payload.get("userId"));

        // Wywołujemy nową metodę w service, która ma mapować plan z USOS do DTO
        classesService.mapUsosPlanToDto(url, userId);

        return ResponseEntity.ok("Import planu z USOS rozpoczęty.");
    }
}

