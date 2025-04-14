package ki.agh.aghub.controller;

import ki.agh.aghub.dto.POIDTO;
import ki.agh.aghub.service.PoiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/poi")
public class PoiController {

    private PoiService poiService;

    public PoiController(PoiService PoiService) {
        this.poiService = PoiService;
    }

    @GetMapping("")
    public List<POIDTO> findAllPOI() {
        return this.poiService.findAllPOI();
    }

    @GetMapping("/{id}")
    public POIDTO findByIdPOI(@PathVariable Long id) {
        return this.poiService.findByIdPOI(id);
    }

    @PostMapping("")
    public POIDTO savePOI(@RequestBody POIDTO poiDTO) {
        return this.poiService.savePOI(poiDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePOI(@PathVariable Long id) {
        this.poiService.deletePOI(id);
    }

}
