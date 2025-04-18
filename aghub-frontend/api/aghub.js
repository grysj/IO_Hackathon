const API_URL = process.env.EXPO_PUBLIC_AGHUB_API_URL;

// FRIENDS API

export const getNewFriends = async (userId, signal = null) => {
  const res = await fetch(`${API_URL}/api/friends/new/${userId}`, {
    signal,
  });
  if (!res.ok) {
    const error = new Error(res.statusText || "Failed to fetch new friends");
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const addNewFriend = async (userId, friendId, signal = null) => {
  const res = await fetch(`${API_URL}/api/friends/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userId,
      friend: friendId,
    }),
    signal,
  });

  if (!res.ok) {
    const error = new Error(res.statusText || "Failed to add new friend");
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// POI API

export const getPoi = async (poiId, signal = null) => {
  const res = await fetch(`${API_URL}/api/poi/${poiId}`, {
    signal,
  });
  if (!res.ok) {
    const error = new Error(res.statusText || "Failed to fetch POI");
    error.status = res.status;
    throw error;
  }
  return res.json();
};

// EVENTS API

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

export const addEvent = async (
  name,
  description,
  dateStart,
  dateEnd,
  latitude,
  longitude,
  poiId,
  createdById,
  signal = null
) => {
  const res = await fetch(`${API_URL}/api/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      dateStart,
      dateEnd,
      latitude,
      longitude,
      poiId,
      createdById,
    }),
    signal,
  });

  if (!res.ok) {
    const error = new Error(res.statusText || "Error while creating event");
    error.status = res.status;
    throw error;
  }

  return res.json();
};

// CLASSES API

export const getClass = async (classId, signal = null) => {
  const res = await fetch(`${API_URL}/api/classes/${classId}`, { signal });
  if (!res.ok) {
    const error = new Error(res.statusText || "Error while fetching class");
    error.status = res.status;
    throw error;
  }
  return res.json();
};
