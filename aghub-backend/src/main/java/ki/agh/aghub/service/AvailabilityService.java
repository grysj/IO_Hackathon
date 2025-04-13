package ki.agh.aghub.service;

import ki.agh.aghub.dto.AvailabilityDTO;
import ki.agh.aghub.repository.ClassesRepository;
import ki.agh.aghub.repository.EventRepository;
import ki.agh.aghub.repository.UnavailabilitiesRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class AvailabilityService {
    private final ClassesRepository classesRepository;
    private final EventRepository eventRepository;
    private final UnavailabilitiesRepository unavailabilitiesRepository;

    public AvailabilityService(ClassesRepository classesRepository, EventRepository eventRepository, UnavailabilitiesRepository unavailabilitiesRepository) {
        this.classesRepository = classesRepository;
        this.eventRepository = eventRepository;
        this.unavailabilitiesRepository = unavailabilitiesRepository;
    }
    public List<AvailabilityDTO> findAllAvailabilities(List<Long> userIds, LocalDateTime from, LocalDateTime to, Duration minDuration) {
        List<AvailabilityDTO> busyTimes = new ArrayList<>();

        for (Long userId : userIds) {

            busyTimes.addAll(classesRepository
                    .findAllOverlappingByUserId(userId, from, to)
                    .stream()
                    .map(c -> new AvailabilityDTO(c.getDateStart(), c.getDateEnd()))
                    .toList());

            busyTimes.addAll(unavailabilitiesRepository
                    .findAllOverlappingByUserId(userId, from, to)
                    .stream()
                    .map(u -> new AvailabilityDTO(u.getDateStart(), u.getDateEnd()))
                    .toList());

            busyTimes.addAll(eventRepository
                    .findAllOverlappingCreatedByUserId(userId, from, to)
                    .stream()
                    .map(e -> new AvailabilityDTO(e.getDateStart(), e.getDateEnd()))
                    .toList());

            busyTimes.addAll(eventRepository
                    .findAllOverlappingCreatedByUserId(userId, from, to)
                    .stream()
                    .map(e -> new AvailabilityDTO(e.getDateStart(), e.getDateEnd()))
                    .toList());
        }

        List<AvailabilityDTO> mergedBusy = mergeTimeRanges(busyTimes);

        // 3. Wyszukaj wolne przedziały między zajętościami
        List<AvailabilityDTO> freeSlots = findFreeSlotsBetween(mergedBusy, from, to);

        // 4. Zwróć tylko te dłuższe niż `minDuration`
        return freeSlots.stream()
                .filter(slot -> Duration.between(slot.startDate(), slot.endDate()).compareTo(minDuration) >= 0)
                .map(slot -> new AvailabilityDTO(slot.startDate(), slot.endDate()))
                .toList();
    }
    public List<AvailabilityDTO> mergeTimeRanges(List<AvailabilityDTO> input) {
        if (input.isEmpty()) return List.of();

        List<AvailabilityDTO> sorted = input.stream()
                .sorted(Comparator.comparing(AvailabilityDTO::startDate))
                .toList();

        List<AvailabilityDTO> merged = new ArrayList<>();
        AvailabilityDTO current = sorted.get(0);

        for (int i = 1; i < sorted.size(); i++) {
            AvailabilityDTO next = sorted.get(i);

            if (!next.startDate().isAfter(current.endDate())) {
                current = new AvailabilityDTO(
                        current.startDate(),
                        current.endDate().isAfter(next.endDate()) ? current.endDate() : next.endDate()
                );
            } else {
                merged.add(current);
                current = next;
            }
        }
        merged.add(current);
        return merged;
    }

    public List<AvailabilityDTO> findFreeSlotsBetween(List<AvailabilityDTO> busy, LocalDateTime from, LocalDateTime to) {
        List<AvailabilityDTO> result = new ArrayList<>();
        LocalDateTime current = from;

        for (AvailabilityDTO busySlot : busy) {
            if (busySlot.startDate().isAfter(current)) {
                result.add(new AvailabilityDTO(current, busySlot.startDate()));
            }
            if (busySlot.endDate().isAfter(current)) {
                current = busySlot.endDate();
            }
        }

        if (current.isBefore(to)) {
            result.add(new AvailabilityDTO(current, to));
        }

        return result;
    }

}
