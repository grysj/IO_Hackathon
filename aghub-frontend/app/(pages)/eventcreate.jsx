import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import EventFriendSelector from "../../components/event/EventFriendSelector";
import EventAvailabilityPicker from "../../components/event/EventAvailabilityPicker";
import LocationPickerScreen from "../../components/event/EventLocationPicker";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { addEvent } from "@/api/aghub";
import EventSummarize from "../../components/event/EventSummarize";

const EventCreateScreen = () => {
  const [friendsId, setFriendsId] = useState([]);
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

  const handleFriendsConfirm = (ids, friends) => {
    setFriendsId(ids);
    setFriends(friends);
    setStep("availability");
  };

  const handleAvailabilityConfirm = (slot) => {
    setSlot(slot);
    setStep("location");
  };

  const handleLocationConfirm = (location) => {
    setLocation(location);
    setStep("summarize");

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
        <EventFriendSelector
          initialFriendsId={friendsId}
          onConfirm={handleFriendsConfirm}
        />
      )}

      {step === "availability" && (
        <EventAvailabilityPicker
          friendIds={friendsId}
          onConfirm={handleAvailabilityConfirm}
        />
      )}

      {step === "location" && (
        <LocationPickerScreen
          initialLocation={location}
          onConfirmLocation={handleLocationConfirm}
        />
      )}
      {step === "summarize" && (
        <EventSummarize
          friends={friends}
          friendsId={friendsId}
          slot={slot}
          setStep={setStep}
          location={location}
        />
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
