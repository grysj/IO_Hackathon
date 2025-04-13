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

    @PostMapping()
    public void saveClass(@RequestBody ClassesDTO classesDTO) {
        this.classesService.saveClasses(classesDTO);
    }
}

