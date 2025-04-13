import { useState } from "react";
import { Box } from "@gluestack-ui/themed";
import FriendSelector from "../../components/event/FriendSelector";
import LocationPickerScreen from "../../components/event/locationpicker";


const EventCreateScreen = () => {
    const [friends, setFriends] = useState([]);
    const [location, setLocation] = useState(null);
    const [step, setStep] = useState("friends");

    const handleFriendsConfirm = (ids) => {
        setFriends(ids);
        setStep("location");
    };

    const handleLocationConfirm = (location) => {
        setLocation(location);

        const eventData = {
            friends,
            location,
        };

        console.log("✅ Wysyłamy dane eventu na backend:", eventData);

        // TODO: wyślij dane na backend, np. fetch("/api/events", { method: "POST", body: JSON.stringify(eventData) })

        // reset or navigate
        setStep("done");
    };

    return (
        <Box className="flex-1 bg-background-50">
            {step === "friends" && (
                <FriendSelector onConfirm={handleFriendsConfirm} />
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
