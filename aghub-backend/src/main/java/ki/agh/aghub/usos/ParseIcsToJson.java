package ki.agh.aghub.usos;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import net.fortuna.ical4j.data.CalendarBuilder;
import net.fortuna.ical4j.model.Calendar;
import net.fortuna.ical4j.model.Component;
import net.fortuna.ical4j.model.Property;
import net.fortuna.ical4j.model.component.VEvent;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ParseIcsToJson {

    // Klasa reprezentująca pojedyncze wydarzenie
    public static class Event {
        private String summary;
        private String dtstart;
        private String dtend;
        private String dtstamp;
        private String uid;
        private String description;
        private String location;
        private String status;
        private String transp;

        // Gettery i settery (potrzebne do serializacji przez Jacksona)
        public String getSummary() {
            return summary;
        }
        public void setSummary(String summary) {
            this.summary = summary;
        }
        public String getDtstart() {
            return dtstart;
        }
        public void setDtstart(String dtstart) {
            this.dtstart = dtstart;
        }
        public String getDtend() {
            return dtend;
        }
        public void setDtend(String dtend) {
            this.dtend = dtend;
        }
        public String getDtstamp() {
            return dtstamp;
        }
        public void setDtstamp(String dtstamp) {
            this.dtstamp = dtstamp;
        }
        public String getUid() {
            return uid;
        }
        public void setUid(String uid) {
            this.uid = uid;
        }
        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }
        public String getLocation() {
            return location;
        }
        public void setLocation(String location) {
            this.location = location;
        }
        public String getStatus() {
            return status;
        }
        public void setStatus(String status) {
            this.status = status;
        }
        public String getTransp() {
            return transp;
        }
        public void setTransp(String transp) {
            this.transp = transp;
        }
    }

    // Metoda pobiera ICS z URL, parsuje go i zwraca listę Eventów
    public static List<Event> parseFromUrl(String urlString) throws Exception {
        List<Event> events = new ArrayList<>();

        URL url = new URL(urlString);
        try (InputStream in = url.openStream()) {
            CalendarBuilder builder = new CalendarBuilder();
            Calendar calendar = builder.build(in);

            // Dla każdej VEVENT w kalendarzu
            for (Component component : calendar.getComponents(Component.VEVENT)) {
                System.out.println("Parsing EVENT/CLASS");
                VEvent vEvent = (VEvent) component;
                Event event = new Event();

                // SUMMARY
                Property summaryProp = vEvent.getProperty("SUMMARY");
                if (summaryProp != null) {
                    event.setSummary(summaryProp.getValue());
                }

                // DTSTART
                Property dtstartProp = vEvent.getProperty("DTSTART");
                if (dtstartProp != null) {
                    event.setDtstart(dtstartProp.getValue());
                }

                // DTEND
                Property dtendProp = vEvent.getProperty("DTEND");
                if (dtendProp != null) {
                    event.setDtend(dtendProp.getValue());
                }

                // DTSTAMP
                Property dtstampProp = vEvent.getProperty("DTSTAMP");
                if (dtstampProp != null) {
                    event.setDtstamp(dtstampProp.getValue());
                }

                // UID
                Property uidProp = vEvent.getProperty("UID");
                if (uidProp != null) {
                    event.setUid(uidProp.getValue());
                }

                // DESCRIPTION
                Property descProp = vEvent.getProperty("DESCRIPTION");
                if (descProp != null) {
                    event.setDescription(descProp.getValue());
                }

                // LOCATION
                Property locProp = vEvent.getProperty("LOCATION");
                if (locProp != null) {
                    event.setLocation(locProp.getValue());
                }

                // STATUS
                Property statusProp = vEvent.getProperty("STATUS");
                if (statusProp != null) {
                    event.setStatus(statusProp.getValue());
                }

                // TRANSP
                Property transpProp = vEvent.getProperty("TRANSP");
                if (transpProp != null) {
                    event.setTransp(transpProp.getValue());
                }

                events.add(event);
            }
        }
        return events;
    }

    // Metoda konwertuje listę Eventów na sformatowany JSON
    public static String convertEventsToJson(List<Event> events) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT); // ładne formatowanie
        return mapper.writeValueAsString(events);
    }

    public static void main(String[] args) {
        // Wyłącz użycie JCache w ical4j
        System.setProperty("net.fortuna.ical4j.timezone.cache.impl", "net.fortuna.ical4j.util.MapTimeZoneCache");

        try {
            String urlString = "https://apps.usos.agh.edu.pl/services/tt/upcoming_ical?lang=pl&user_id=109988&key=gPmf72NftUVAk5geu4C6";
            List<Event> events = parseFromUrl(urlString); // Parsowanie pliku ICS
            String json = convertEventsToJson(events);
            System.out.println(json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
