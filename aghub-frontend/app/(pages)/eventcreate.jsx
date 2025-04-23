import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import EventFriendSelector from "../../components/event/EventFriendSelector";
import EventAvailabilityPicker from "../../components/event/EventAvailabilityPicker";
import LocationPickerScreen from "../../components/event/EventLocationPicker";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { addEvent } from "@/api/aghub";
import EventSummarize from "../../components/event/EventSummarize";
import PageView from "../../components/ui/PageView";

const EventCreateScreen = () => {
  const [friendsId, setFriendsId] = useState([]);
  const [friends, setFriends] = useState([]);
  const [slot, setSlot] = useState(null);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState("friends");
  const { user } = useAuth();
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
    setStep("summarize")
  };

  return (
    <PageView>
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
    </PageView>
  );
};

export default EventCreateScreen;
