import { useState } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";
import LocationPickerScreen from "../../components/event/locationpicker";

const EventCreateScreen = () => {
    const [friends, setFriends] = useState([]);
    const [step, setStep] = useState("location");

    const handleFriendsConfirm = (ids) => {
        setFriends(ids);
        setStep("location");
    };

    return (
        <Box className="flex-1 bg-background-50">
            {step === "friends" && (
                <FriendSelector onConfirm={handleFriendsConfirm} />
            )}
            {step === "location" && (
                <LocationPickerScreen />
            )}
        </Box>
    );
};

export default EventCreateScreen;
