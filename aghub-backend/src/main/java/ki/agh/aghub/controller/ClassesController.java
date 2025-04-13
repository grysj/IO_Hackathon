package ki.agh.aghub.controller;

import ki.agh.aghub.dto.ClassesDTO;
import ki.agh.aghub.service.ClassesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}

