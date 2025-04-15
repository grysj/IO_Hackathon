package ki.agh.aghub.controller;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.service.ClassesService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;


import java.util.Map;

@RestController
@RequestMapping("/api/classes")
public class ClassesController {

    private ClassesService classesService;

    public ClassesController(ClassesService classesService) {
        this.classesService = classesService;
    }

    @GetMapping("")
    public List<ClassesDTO> findAllClasses() {
        return this.classesService.findAllClasses();
    }

    @GetMapping("/{id}")
    public ClassesDTO findByIdClasses(@PathVariable Long id) {
        return this.classesService.findByIdClasses(id);
    }

    @PostMapping("")
    public ClassesDTO saveClass(@RequestBody ClassesDTO classesDTO) {
        return this.classesService.saveClasses(classesDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteClasses(@PathVariable Long id) {
        this.classesService.deleteClasses(id);
    }



    // Nowy endpoint: przyjmuje url oraz userId do zrobienia planu
    @PostMapping("/import_usos")
    public ResponseEntity<String> importUsosPlan(@RequestBody Map<String, String> payload) {
        String url = payload.get("url");
        Long userId = Long.parseLong(payload.get("userId"));

        System.out.println(userId);

        // Wywołujemy nową metodę w service, która ma mapować plan z USOS do DTO
        classesService.mapUsosPlanToDto(url, userId);

        return ResponseEntity.ok("Import planu z USOS rozpoczęty.");
    }
}

