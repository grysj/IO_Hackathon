package ki.agh.aghub.controller;

import ki.agh.aghub.dto.POIDTO;
import ki.agh.aghub.repository.PoiRepository;
import ki.agh.aghub.service.PoiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/poi")
public class PoiController {

    private PoiService PoiService;

    public PoiController(PoiService PoiService) {
        this.PoiService = PoiService;
    }

    @GetMapping("")
    public List<POIDTO> findAllPOI() {
        return this.PoiService.findAllPOI();
    }

    @GetMapping("/{id}")
    public POIDTO findByIdPOI(@PathVariable Long id) {
        return this.PoiService.findByIdPOI(id);
    }

    @PostMapping("")
    public void savePOI(@RequestBody POIDTO poiDTO) {
        this.PoiService.savePOI(poiDTO);
    }

}
