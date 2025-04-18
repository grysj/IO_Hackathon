import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";
import AvailabilityPicker from "../../components/event/AvailabilityPicker";
import LocationPickerScreen from "../../components/event/locationpicker";
import { useAuth } from "../../contexts/AuthContext";

const EventCreateScreen = () => {
  const [friends, setFriends] = useState([]);
  const [slot, setSlot] = useState(null);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState("friends");
  const { user } = useAuth();
  const handleFriendsConfirm = (ids) => {
    setFriends(ids);
    setStep("availability");
  };

  const handleAvailabilityConfirm = (slot) => {
    setSlot(slot);
    setStep("location");
  };
  const fetchEvent = async ({ userId, slot, location }) => {
    try {
      const eventDto = {
        name: "Nowe wydarzenie",
        description: "Wydarzenie utworzone z aplikacji",
        dateStart: slot.startDate,//TODO tu jest błąd pewnie z formatem danych dlatego to nie chciało się wysyłać
        dateEnd: slot.endDate,
        latitude: location.latitude,
        longitude: location.longitude,
        poiId: null,
        createdById: userId,
      };

      const response = await fetch("http://34.116.250.33:8080/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDto),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Błąd zapisu wydarzenia: ${errText}`);
      }

      console.log("Wydarzenie zapisane pomyślnie");
    } catch (err) {
      console.error("Błąd podczas zapisu eventu:", err.message);
    }
  };

  const handleLocationConfirm = (location) => {
    setLocation(location);

    const eventData = {
      friends,
      slot,
      location,
    };

    // Tutaj będzie wysłanie do prawdziwego backendu, gdy go dodasz
    console.log("📦 Gotowe dane do wysłania:", eventData);

    fetchEvent({
      userId: user.id,
      slot,
      location,
    }).then(setStep("done"));
  };

  return (
    <Box className="flex-1 bg-background-50">
      {step === "friends" && (
        <FriendSelector onConfirm={handleFriendsConfirm} />
      )}

      {step === "availability" && (
        <AvailabilityPicker
          friendIds={friends}
          onConfirm={handleAvailabilityConfirm}
        />
      )}

      {step === "location" && (
        <LocationPickerScreen onConfirmLocation={handleLocationConfirm} />
      )}

      {step === "done" && (
        <Box className="p-4">
          <Text className="text-xl text-center text-green-700 font-bold">
            Event zapisany!
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default EventCreateScreen;
