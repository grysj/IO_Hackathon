const API_URL = process.env.EXPO_PUBLIC_AGHUB_API_URL;

export const getClass = async (classId, signal = null) => {
  const res = await fetch(`${API_URL}/api/classes/${classId}`, { signal });
  if (!res.ok) {
    const error = new Error(res.statusText || "Error while fetching class");
    error.status = res.status;
    throw error;
  }
  return res.json();
};
