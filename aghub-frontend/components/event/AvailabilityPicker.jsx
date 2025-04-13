import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Pressable,
    ScrollView,
    Input,
    InputField,
} from "@gluestack-ui/themed";
import { Platform, StatusBar } from "react-native";

const HARDCODED_AVAILABILITY = [
    { start: "2025-04-14T10:00:00", end: "2025-04-14T11:00:00" },
    { start: "2025-04-14T14:00:00", end: "2025-04-14T15:00:00" },
    { start: "2025-04-14T19:00:00", end: "2025-04-14T20:00:00" },
    { start: "2025-04-15T09:00:00", end: "2025-04-15T10:00:00" },
    { start: "2025-04-15T12:00:00", end: "2025-04-15T13:00:00" },
    { start: "2025-04-16T16:00:00", end: "2025-04-16T17:00:00" },
];

const getFormattedDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
};

const AvailabilityPicker = ({ friendIds = [], onConfirm }) => {
    const [minDuration, setMinDuration] = useState("60");
    const [timeRange, setTimeRange] = useState({ from: "08:00", to: "23:00" });
    const [selectedDate, setSelectedDate] = useState(getFormattedDate(0));
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const dates = [getFormattedDate(0), getFormattedDate(1), getFormattedDate(2)];

    useEffect(() => {
        if (Array.isArray(friendIds)) {
            filterAvailability();
        }
    }, [friendIds, selectedDate, minDuration, timeRange]);

    const filterAvailability = () => {
        const [fromHour] = timeRange.from.split(":").map(Number);
        const [toHour] = timeRange.to.split(":").map(Number);
        const minMs = parseInt(minDuration) * 60 * 1000;

        const filtered = HARDCODED_AVAILABILITY.filter((slot) => {
            const start = new Date(slot.start);
            const end = new Date(slot.end);
            const duration = end - start;
            const hour = start.getHours();
            const dateStr = slot.start.split("T")[0];

            return (
                dateStr === selectedDate &&
                hour >= fromHour &&
                hour < toHour &&
                duration >= minMs
            );
        });

        setAvailableSlots(filtered);
    };

    const handleConfirm = () => {
        if (selectedSlot) {
            onConfirm(selectedSlot);
        }
    };

    return (
        <Box
            className="flex-1 bg-background-50 px-4"
            style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
                paddingBottom: 20,
            }}
        >
            <Text className="text-2xl font-bold mb-4 text-white">
                Wybierz dostępny termin
            </Text>

            <VStack space="lg" className="mb-4">
                <Text className="text-base font-semibold text-white">
                    Minimalny czas trwania (minuty):
                </Text>
                <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                    <InputField
                        keyboardType="numeric"
                        value={minDuration}
                        onChangeText={setMinDuration}
                        placeholder="Np. 60"
                        style={{ color: "#fff" }}
                        placeholderTextColor="#aaa"
                    />
                </Input>

                <Text className="text-base font-semibold text-white">
                    Zakres godzin:
                </Text>

                <HStack space="md" className="flex-row">
                    <Box className="flex-1 min-w-[100px]">
                        <Text className="text-white mb-1">Od:</Text>
                        <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                            <InputField
                                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
                                value={timeRange.from}
                                onChangeText={(text) =>
                                    setTimeRange((prev) => ({ ...prev, from: text }))
                                }
                                placeholder="08:00"
                                style={{ color: "#fff" }}
                                placeholderTextColor="#aaa"
                            />
                        </Input>
                    </Box>
                    <Box className="flex-1 min-w-[100px]">
                        <Text className="text-white mb-1">Do:</Text>
                        <Input className="bg-background-100 px-4 py-4 rounded-lg w-full">
                            <InputField
                                keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "default"}
                                value={timeRange.to}
                                onChangeText={(text) =>
                                    setTimeRange((prev) => ({ ...prev, to: text }))
                                }
                                placeholder="23:00"
                                style={{ color: "#fff" }}
                                placeholderTextColor="#aaa"
                            />
                        </Input>
                    </Box>
                </HStack>

                <Text className="text-base font-semibold text-white mt-2">
                    Dzień wydarzenia:
                </Text>
                <HStack space="md" className="flex-wrap">
                    {dates.map((date) => (
                        <Pressable
                            key={date}
                            onPress={() => setSelectedDate(date)}
                            className={`w-full px-4 py-3 rounded-lg border text-center mb-2 ${
                                selectedDate === date
                                    ? "bg-yellow-600 border-yellow-700"
                                    : "bg-background-100 border-outline-200"
                            }`}
                        >
                            <Text
                                className={`text-center ${
                                    selectedDate === date
                                        ? "text-white"
                                        : "text-typography-900"
                                }`}
                            >
                                {new Date(date).toLocaleDateString()}
                            </Text>
                        </Pressable>
                    ))}
                </HStack>

                <Pressable
                    onPress={filterAvailability}
                    className="bg-yellow-600 p-4 rounded-lg items-center mt-4"
                >
                    <Text className="text-white font-bold">Odśwież dostępność</Text>
                </Pressable>
            </VStack>

            <ScrollView className="mb-4" style={{ flexGrow: 0 }}>
                <VStack space="md">
                    {availableSlots.map((slot, index) => {
                        const isSelected = selectedSlot?.start === slot.start;
                        return (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedSlot(slot)}
                                className={`w-full p-4 rounded-lg border ${
                                    isSelected
                                        ? "bg-yellow-600 border-yellow-700"
                                        : "bg-background-100 border-outline-200"
                                }`}
                            >
                                <Text
                                    className={`text-lg font-semibold ${
                                        isSelected ? "text-white" : "text-typography-900"
                                    }`}
                                >
                                    {new Date(slot.start).toLocaleDateString()}{" "}
                                    {new Date(slot.start).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(slot.end).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </Text>
                            </Pressable>
                        );
                    })}
                </VStack>
            </ScrollView>

            {/* Przycisk na dole */}
            <Box className="mt-4">
                <Pressable
                    onPress={handleConfirm}
                    disabled={!selectedSlot}
                    className={`py-4 rounded-xl items-center ${
                        selectedSlot ? "bg-green-600" : "bg-background-muted"
                    }`}
                >
                    <Text className="text-white font-bold text-lg">
                        {selectedSlot ? "Wybierz lokalizację ➡️" : "Zaznacz termin"}
                    </Text>
                </Pressable>
            </Box>
        </Box>
    );
};

export default AvailabilityPicker;
