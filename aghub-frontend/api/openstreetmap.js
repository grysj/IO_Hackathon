const API_URL = process.env.EXPO_PUBLIC_OPENSTREETMAP_API_URL;

export const searchLocation = async (query) => {
  console.log("Searching for location:", query);
  const res = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
    {
      method: "GET",
      headers: {
        "User-Agent": "AGHub/1.0",
        "Content-Type": "application/json",
      },
    }
  );

  console.log(res.status);

  if (!res.ok) {
    const error = new Error(res.statusText || "Failed to fetch location");
    error.status = res.status;
    throw error;
  }

  return res.json();
};
