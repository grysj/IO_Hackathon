package ki.agh.aghub.dto;

import ki.agh.aghub.model.POI;

public record POIDTO(
        String name,
        double lat,
        double lng
) {

    public static POIDTO fromPOI(POI poi) {
        return new POIDTO(
                poi.getName(),
                poi.getLat(),
                poi.getLng()
        );
    }

    public static POI toPOI(POIDTO poiDTO) {
        return POI.builder()
                .name(poiDTO.name())
                .lat(poiDTO.lat())
                .lng(poiDTO.lng())
                .build();
    }

}
