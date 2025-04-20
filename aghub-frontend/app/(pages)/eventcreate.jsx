import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import EventFriendSelector from "../../components/event/EventFriendSelector";
import EventAvailabilityPicker from "../../components/event/EventAvailabilityPicker";
import LocationPickerScreen from "../../components/event/EventLocationPicker";
import { useAuth } from "../../contexts/AuthContext";
import EventSummarize from "../../components/event/EventSummarize";

const EventCreateScreen = () => {
  const [friendsId, setFriendsId] = useState([]);
  const [friends, setFriends] = useState([])
  const [slot, setSlot] = useState(null);
  const [location, setLocation] = useState(null);
  const [step, setStep] = useState("friends");
  const { user } = useAuth();
  const handleFriendsConfirm = (ids, friends) => {
    setFriendsId(ids);
    setFriends(friends)
    setStep("availability");
  };

  const handleAvailabilityConfirm = (slot) => {
    setSlot(slot);
    setStep("location");
  };


  const handleLocationConfirm = (location) => {
    setLocation(location);
    setStep("summarize")

    // const eventData = {
    //   friends: friendsId,
    //   slot,
    //   location,
    // };
    //
    // // Tutaj będzie wysłanie do prawdziwego backendu, gdy go dodasz
    // console.log("📦 Gotowe dane do wysłania:", eventData);
    //
    // fetchEvent({
    //   userId: user.id,
    //   slot,
    //   location,
    // }).then(setStep("done"));
  };

  return (
    <Box className="flex-1 bg-background-50">
      {step === "friends" && (
        <EventFriendSelector initialFriendsId={friendsId} onConfirm={handleFriendsConfirm} />
      )}

      {step === "availability" && (
        <EventAvailabilityPicker
          friendIds={friendsId}
          onConfirm={handleAvailabilityConfirm}
        />
      )}

      {step === "location" && (
        <LocationPickerScreen initialLocation={location} onConfirmLocation={handleLocationConfirm} />
      )}
      {step==="summarize" &&(
          <EventSummarize friends={friends} friendsId={friendsId} slot={slot} setStep={setStep} location={location} />
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
