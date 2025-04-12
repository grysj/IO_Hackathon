package ki.agh.aghub.dto;

import java.time.LocalDateTime;

public class EventsDTO {

    private String name;

    private String description;

    private LocalDateTime dateStart;

    private LocalDateTime dateEnd;

    private Double latitude;

    private Double longitude;

    private Long poiId;

    private Long createdById;

    public EventsDTO(String name, String description, LocalDateTime dateStart, LocalDateTime dateEnd, Double latitude, Double longitude, Long poiId, Long createdById) {
        this.name = name;
        this.description = description;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.latitude = latitude;
        this.longitude = longitude;
        this.poiId = poiId;
        this.createdById = createdById;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDateTime dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDateTime getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDateTime dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Long getPoiId() {
        return poiId;
    }

    public void setPoiId(Long poiId) {
        this.poiId = poiId;
    }

    public Long getCreatedById() {
        return createdById;
    }

    public void setCreatedById(Long createdById) {
        this.createdById = createdById;
    }
}
