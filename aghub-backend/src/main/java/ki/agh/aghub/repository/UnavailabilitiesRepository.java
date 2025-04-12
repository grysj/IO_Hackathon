package ki.agh.aghub.repository;

import ki.agh.aghub.model.Unavailability;

import java.util.List;

public interface UnavailabilitiesRepository {

    public List<Unavailability> findAll();

    public List<Unavailability> findUnavailabilitiesByUserAndDate();

}
