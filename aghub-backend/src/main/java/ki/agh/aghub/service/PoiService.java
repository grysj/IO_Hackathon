package ki.agh.aghub.service;

import jakarta.persistence.EntityNotFoundException;
import ki.agh.aghub.dto.POIDTO;
import ki.agh.aghub.repository.PoiRepository;

import java.util.List;
import java.util.stream.Collectors;

public class PoiService {

    private PoiRepository poiRepository;

    public PoiService(PoiRepository poiRepository) {
        this.poiRepository = poiRepository;
    }

    public List<POIDTO> findAllPOI() {
        return this.poiRepository.findAll().stream()
                .map(POIDTO::fromPOI)
                .collect(Collectors.toList());
    }

    public POIDTO findByIdPOI(Long id) {
        return this.poiRepository.findById(id)
                .map(POIDTO::fromPOI)
                .orElseThrow(() ->
                        new EntityNotFoundException("POI not found with id: " + id)
                );
    }

    public POIDTO savePOI(POIDTO poiDTO) {
        return POIDTO.fromPOI(this.poiRepository.save(POIDTO.toPOI(poiDTO)));
    }

    public void deletePOI(Long id) {
        this.poiRepository.deleteById(id);
    }

}
