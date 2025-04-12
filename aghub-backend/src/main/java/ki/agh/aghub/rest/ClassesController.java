package ki.agh.aghub.rest;

import ki.agh.aghub.entity.ClassesDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/classes")
public class ClassesController {

    private ClassesService classesService;

    public ClassesController(ClassesService classesService) {
        this.classesService = classesService;
    }

    @PostMapping()
    public ClassesDTO saveClass(@RequestBody ClassesDTO classesDTO) {
        return this.classesService.save(classesDTO);
    }
}

