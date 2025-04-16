const API_URL = process.env.EXPO_PUBLIC_AGHUB_API_URL;

export const getPoi = async (poiId, signal) => {
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
