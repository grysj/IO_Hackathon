const API_URL = process.env.EXPO_PUBLIC_AGHUB_API_URL;

export const getEvent = async (eventId, signal = null) => {
  const res = await fetch(`${API_URL}/api/events/${eventId}`, { signal });
  if (!res.ok) {
    const error = new Error(res.statusText || "Error while fetching event");
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const getEventParticipants = async (eventId, signal = null) => {
  const res = await fetch(`${API_URL}/api/events/participant/${eventId}`, {
    signal,
  });
  if (!res.ok) {
    const error = new Error(
      res.statusText || "Error while fetching participants"
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
};
