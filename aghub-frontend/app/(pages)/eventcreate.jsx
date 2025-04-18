import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";
import AvailabilityPicker from "../../components/event/AvailabilityPicker";
import LocationPickerScreen from "../../components/event/locationpicker";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { addEvent } from "@/api/aghub";

const EventCreateScreen = () => {
  const [friends, setFriends] = useState([]);
  const [slot, setSlot] = useState(null);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState("friends");
  const { user } = useAuth();

  const addEventMutation = useMutation({
    mutationFn: ({
      name,
      description,
      dateStart,
      dateEnd,
      latitude,
      longitude,
      poiId,
      userId,
    }) => {
      return addEvent(
        name,
        description,
        dateStart,
        dateEnd,
        latitude,
        longitude,
        poiId,
        userId
      );
    },
    onSettled: () => {
      setStep("done");
    },
  });

  const handleFriendsConfirm = (ids) => {
    setFriends(ids);
    setStep("availability");
  };

  const handleAvailabilityConfirm = (slot) => {
    setSlot(slot);
    setStep("location");
  };

  const handleLocationConfirm = (location) => {
    setLocation(location);

    addEventMutation.mutate({
      name: "Nowe wydarzenie",
      description: "Wydarzenie utworzone z aplikacji",
      dateStart: slot.dateStart,
      dateEnd: slot.dateEnd,
      latitude: location.latitude,
      longitude: location.longitude,
      poiId: null,
      userId: user.id,
    });
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
