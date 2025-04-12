import { useRouter } from "expo-router";
import { Button } from "react-native";
import { Box } from "@gluestack-ui/themed";

const EventCreateScreen = () => {
    const router = useRouter();

    return (
        <Box className="flex-1 bg-background-50 justify-center items-center">
            {/* Placeholder */}
            <Button title="Przejdź do dostępnych terminów" onPress={() => router.push("/(pages)/availability")} />
        </Box>
    );
};

export default EventCreateScreen;
