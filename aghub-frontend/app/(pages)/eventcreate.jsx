import React, { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";
import AvailabilityPicker from "../../components/event/AvailabilityPicker";
import LocationPickerScreen from "../../components/event/locationpicker";

const EventCreateScreen = () => {
    const [friends, setFriends] = useState([]);
    const [slot, setSlot] = useState(null);
    const [location, setLocation] = useState(null);
    const [step, setStep] = useState("friends");

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

        const eventData = {
            friends,
            slot,
            location,
        };

        // Tutaj będzie wysłanie do prawdziwego backendu, gdy go dodasz
        console.log("📦 Gotowe dane do wysłania:", eventData);

        setStep("done");
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
