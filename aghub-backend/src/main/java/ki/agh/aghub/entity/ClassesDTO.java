package ki.agh.aghub.entity;

import ki.agh.aghub.model.POI;

import java.time.LocalDateTime;

public class ClassesDTO {

    private String name;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String room;

    private Long poiId;

    private Long userId;

    public ClassesDTO(String name, LocalDateTime startDate, LocalDateTime endDate, String room, Long poiId, Long userId) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.room = room;
        this.poiId = poiId;
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public Long getPoiId() {
        return poiId;
    }

    public void setPoiId(Long poiId) {
        this.poiId = poiId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
